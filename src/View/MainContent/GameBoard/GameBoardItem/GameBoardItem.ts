import './GameBoardItem.scss';
import { f } from '../../../../../Util';
import {basePathImages, imagesExtension, playDelay, starSvg} from '../../../../canstants';
import { StoreType } from '../../../../types';
import { translateImages, TranslateType } from '../../../../storage/imagesStorage';
import { SoundsPlay } from '../../../../StartPlay/SoundsPlay/SoundsPlay';
import { IPlay } from '../../../../StartPlay/Play';
import Control from "../../../../common/Control";

export interface IGameBoardItem {
  render(category:string, image:string):HTMLElement
  viewCorrect(e:Event):void
  viewMistakes(e:Event):void
  listenClick(e:Event):void
}
export class GameBoardItem extends Control {
  //parent:HTMLElement;

  className:string;

  cardPlayClass:string;

  cardTrainClass:string;

  //cardElement:HTMLElement;

  store:StoreType;

  frontText:string;

  backText:string;

  //play:IPlay;

  //starsContainer:HTMLElement;
  private card: Control<HTMLElement>;

  constructor(parentNode:HTMLElement,category:string, image:string, store:StoreType/*parent:HTMLElement, play:IPlay, stars:HTMLElement*/) {
    super(parentNode)
    //this.parent = parent;
    this.className = 'card__content';
    this.cardPlayClass = 'card__content_play';
    this.cardTrainClass = 'card__content_train';
  //  this.cardElement = this.parent?.querySelector(`.${this.className}`) as HTMLElement;
    this.store = store;
    this.frontText = 'card__front_text';
    this.backText = 'card__front_text';
  //  this.play = play;
    //this.starsContainer = stars;
    this.store.subscribe(()=>{
    //  this.play.mistakes=0
    })
    const cardWrapper = new Control(this.node,'div', 'card__wrapper')
    this.card = new Control(cardWrapper.node,'div', this.className)
    const front = new Control(this.card.node,'div', 'card__front')
    const bgImg=new Control(front.node,'img', 'card__back-bg')
    bgImg.node.setAttribute('data-word', image)
    bgImg.node.setAttribute('src', `${basePathImages}${category}/${image}${imagesExtension}`)
    const frontBlock=new Control(front.node,'div','card__front_block')

    const back = new Control(this.card.node,'div', 'card__back')
    //  const frontB = new Control(card.node,'div', 'card__front')//???
    const frImg = new Control(back.node,'img', 'card__front-bg')
    frImg.node.setAttribute('src',`${basePathImages}${category}/${image}${imagesExtension}`)

    const blockCardDiv = new Control(cardWrapper.node,'div', 'blockCard__div')
    bgImg.node.addEventListener('click', (e) => {
      if (this.store.getState().mode === 'train') {
        console.log(this.card.node,image)
        const wordAudio = new SoundsPlay(this.card.node,image);
        //this.play.trainClick(card as HTMLElement);
        setTimeout(() => wordAudio.destroy() , playDelay);
      }
      if (this.store.getState().mode === 'game') {
        // if (this.play.gameClick(e)) {
        //   this.viewCorrect(e);
        // } else {
        //   this.viewMistakes(e);
        // }
      }
    }, false);
    if (this.store.getState().mode === 'train') {
      const translateWord: string = translateImages[image as keyof TranslateType] as string;
      const frontText = new Control(front.node,'div', this.frontText,image.toUpperCase())
      const rotate = new Control(frontText.node,'span', 'card__rotate')
      const imgRotate = new Control(rotate.node,'img')
        imgRotate.node.setAttribute('src', './assets/img/rotate.svg')
      const backText = new Control(back.node,'div', this.backText,`${translateWord}`)
      rotate.node.addEventListener('click', (e:Event) => {
        this.listenClick(e);
      }, false);
    }
    blockCardDiv.node.addEventListener('mouseleave', () => {
      blockCardDiv.node.classList.add('hideBlockDiv');
      this.card.node.classList.remove('flipped');
    });

  }

  viewCorrect(e:Event):void {
    const audio:Node = (e.target as HTMLElement)?.parentElement?.querySelector('audio') as Node;
    const star:string = starSvg;
    const starElement:HTMLElement = f.create('span', 'star__correct').html(star).end();
   // (this.starsContainer as HTMLElement)?.appendChild(starElement);
   // (e.target as HTMLElement).parentElement?.appendChild(SoundsPlay('correct'));
    setTimeout(() => {
      (e.target as HTMLElement).parentElement?.removeChild(
        (e.target as HTMLElement)?.parentElement?.querySelector('audio') as Node,
      );
    }, 200);
    (e.target as HTMLElement).closest('.card__wrapper')?.querySelector('.card__front_block')?.classList.add('correct')
  }

  viewMistakes(e:Event):void {
    // const star:string = starSvg;
    // const starElement:HTMLElement = f.create('span', 'star__error').html(star).end();
    // (this.starsContainer as HTMLElement)?.appendChild(starElement);
    // (e.target as HTMLElement).parentElement?.appendChild(SoundsPlay('error'));
    // setTimeout(() => (e.target as HTMLElement).parentElement?.removeChild(
    //   (e.target as HTMLElement)?.parentElement?.querySelector('audio') as HTMLElement,
    // ), 200);
  }

  listenClick(e:Event):void {
    this.card.node.classList.add('flipped');
  }
}
