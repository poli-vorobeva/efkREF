import './GameBoardItem.scss';
import {f} from '../../../../../Util';
import {basePathImages, imagesExtension, playDelay, starSvg} from '../../../../canstants';
import {StoreType} from '../../../../types';
import {translateImages, TranslateType} from '../../../../storage/imagesStorage';
import {SoundsPlay} from '../../../../StartPlay/SoundsPlay/SoundsPlay';
//import { IPlay } from '../../../../StartPlay/Play';
import Control from "../../../../common/Control";
import {GameController} from "../../../../StartPlay/GameController";

// export interface IGameBoardItem {
//   render(category: string, image: string): HTMLElement
//
//   viewCorrect(e: Event): void
//
//   viewMistakes(e: Event): void
//
//   listenClick(e: Event): void
// }

export class GameBoardItem extends Control {
  className: string;
  cardPlayClass: string;
  cardTrainClass: string;
  store: StoreType;
  frontText: Control<HTMLElement>;
  backText: Control<HTMLElement>;
  private card: Control<HTMLElement>;
  onTrainClick: (word: string) => void;
  onGameClick: (word: string) => boolean;
  removeRandomAudio: () => void;
  private front: Control<HTMLElement>;
  private back: Control<HTMLElement>;
  private frontTextClass: string;
  private backTextClass: string;
  private frontBlock: Control<HTMLElement>;
  addStar:(className:string)=>void
  constructor(parentNode: HTMLElement, category: string, image: string,
              store: StoreType) {
    super(parentNode,'div', 'card__wrapper')
    this.className = 'card__content';
    this.cardPlayClass = 'card__content_play';
    this.cardTrainClass = 'card__content_train';
    //  this.cardElement = this.parent?.querySelector(`.${this.className}`) as HTMLElement;
    this.store = store;
    this.frontTextClass = 'card__front_text';
    this.backTextClass = 'card__front_text';
    //const cardWrapper = new Control(this.node, )
    this.card = new Control(this.node, 'div', this.className)
    this.front = new Control(this.card.node, 'div', 'card__front')
    const bgImg = new Control(this.front.node, 'img', 'card__back-bg')
    //bgImg.node.setAttribute('data-word', image)
    bgImg.node.setAttribute('src', `${basePathImages}${category}/${image}${imagesExtension}`)
    this.frontBlock = new Control(this.front.node, 'div', 'card__front_block')

    this.back = new Control(this.card.node, 'div', 'card__back')
    //  const frontB = new Control(card.node,'div', 'card__front')//???
    const frImg = new Control(this.back.node, 'img', 'card__front-bg')
    frImg.node.setAttribute('src', `${basePathImages}${category}/${image}${imagesExtension}`)
    if (this.store.getState().mode==='train') {
      this.trainContent(image)
    }
    const blockCardDiv = new Control(this.node, 'div', 'blockCard__div')
    bgImg.node.onclick = (e) => {
      if (this.store.getState().mode === 'train') {
        const wordAudio = new SoundsPlay(this.card.node, image);
        this.onTrainClick(image)
        setTimeout(() => wordAudio.destroy(), playDelay*5);
      }
      if (this.store.getState().mode === 'game') {
        const isStarted=
        this.onGameClick(image) ? this.viewCorrect(e) : this.viewMistakes(e);
      }
      }
    blockCardDiv.node.addEventListener('mouseleave', () => {
     blockCardDiv.node.classList.add('hideBlockDiv');
      this.card.node.classList.remove('flipped');
    });
  }

  viewCorrect(e: Event): void {
    this.frontBlock.node.classList.add('correct')
    const audio=new SoundsPlay(this.node,'correct')
    this.addStar('star__correct')
    setTimeout(() => {
      audio.destroy()
      this.removeRandomAudio()
    }, 800);
  }

  viewMistakes(e: Event): void {
    const audio= new SoundsPlay(this.node,'error')
    this.addStar('star__error')
    // const star:string = starSvg;
    // const starElement:HTMLElement = f.create('span', 'star__error').html(star).end();
    // (this.starsContainer as HTMLElement)?.appendChild(starElement);
    // (e.target as HTMLElement).parentElement?.appendChild(SoundsPlay('error'));
    setTimeout(() => audio.destroy(), 200);
  }

  listenClick(e: Event): void {
    this.card.node.classList.add('flipped');
  }

  removeTrainContent() {
    this.frontText.destroy()
    this.backText.destroy()
  }

  private trainContent(image: string) {
    const translateWord: string = translateImages[image as keyof TranslateType] as string;
    this.frontText = new Control(this.front.node, 'div', this.frontTextClass, image.toUpperCase())
    const rotate = new Control(this.frontText.node, 'span', 'card__rotate')
    const imgRotate = new Control(rotate.node, 'img')
    imgRotate.node.setAttribute('src', './assets/img/rotate.svg')
    this.backText = new Control(this.back.node, 'div', this.backTextClass, `${translateWord}`)
    rotate.node.addEventListener('click', (e: Event) => {
      this.listenClick(e);
    }, false);
  }
}
