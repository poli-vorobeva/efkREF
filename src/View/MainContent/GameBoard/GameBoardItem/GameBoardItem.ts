import './GameBoardItem.scss';
import { f } from '../../../../../Util';
import {basePathImages, imagesExtension, playDelay, starSvg} from '../../../../canstants';
import { StoreType } from '../../../../types';
import { translateImages, TranslateType } from '../../../../storage/imagesStorage';
import { SoundsPlay } from '../../../../StartPlay/SoundsPlay/SoundsPlay';
import { IPlay } from '../../../../StartPlay/Play';

export interface IGameBoardItem {
  render(category:string, image:string):HTMLElement
  viewCorrect(e:Event):void
  viewMistakes(e:Event):void
  listenClick(e:Event):void
}
export class GameBoardItem implements IGameBoardItem {
  parent:HTMLElement;

  className:string;

  cardPlayClass:string;

  cardTrainClass:string;

  cardElement:HTMLElement;

  store:StoreType;

  frontText:string;

  backText:string;

  play:IPlay;

  starsContainer:HTMLElement;

  constructor(parent:HTMLElement, store:StoreType, play:IPlay, stars:HTMLElement) {
    this.parent = parent;
    this.className = 'card__content';
    this.cardPlayClass = 'card__content_play';
    this.cardTrainClass = 'card__content_train';
    this.cardElement = this.parent?.querySelector(`.${this.className}`) as HTMLElement;
    this.store = store;
    this.frontText = 'card__front_text';
    this.backText = 'card__front_text';
    this.play = play;
    this.starsContainer = stars;
  }

  render(category:string, image:string):HTMLElement {
    this.store.subscribe(()=>{
      this.play.mistakes=0
    })
    const bgImg: HTMLElement = f
      .create('img', 'card__back-bg').attribute('data-word', image)
      .attribute('src', `${basePathImages}${category}/${image}${imagesExtension}`).end();
const frontBlock=f.create('div','card__front_block').end()

    const front: HTMLElement = f
      .create('div', 'card__front')
      .append(bgImg)
      .append(frontBlock)
      .end();
    const frImg: HTMLElement = f
      .create('img', 'card__front-bg')
      .attribute(
        'src',
        `${basePathImages}${category}/${image}${imagesExtension}`,
      ).end();
    const back: HTMLElement = f
      .create('div', 'card__back')
      .append(front)
      .append(frImg)
      .end();

    if (this.store.getState().mode === 'train') {
      const translateWord: string = translateImages[image as keyof TranslateType] as string;
      const imgRotate:HTMLElement = f.create('img').attribute('src', './assets/img/rotate.svg').end();
      const rotate:HTMLElement = f.create('span', 'card__rotate').append(imgRotate).end();
      const frontText:HTMLElement = f.create('div', this.frontText).text(image.toUpperCase()).append(rotate).end();
      const backText:HTMLElement = f.create('div', this.backText).text(`${translateWord}`).end();
      front.appendChild(frontText);
      back.appendChild(backText);
    }

    const card: HTMLElement = f
      .create('div', this.className)
      .append(front as HTMLElement)
      .append(back as HTMLElement)
      .end();
    const blockCardDiv: HTMLElement = f.create('div', 'blockCard__div').end();
    const cardWrapper:HTMLElement = f.create('div', 'card__wrapper').append(card).append(blockCardDiv).end();
    //console.log(card.querySelector('img'))
    card.querySelector('img')?.addEventListener('click', (e) => {
      //console.log('click')
      if (this.store.getState().mode === 'train') {
        const wordAudio:HTMLElement = SoundsPlay(image);
        const card=(e.target as HTMLElement)?.closest(`.${this.className}`)
        this.play.trainClick(card as HTMLElement);
        card?.appendChild(wordAudio);
        setTimeout(() => { (e.target as HTMLElement).removeChild(wordAudio); }, playDelay);
      }
      if (this.store.getState().mode === 'game') {
        if (this.play.gameClick(e)) {
          this.viewCorrect(e);
        } else {
          this.viewMistakes(e);
        }
      }
     // console.log('BLOCK',blockCardDiv)

    }, false);
    blockCardDiv.addEventListener('mouseleave', () => {
      console.log('leee')
      console.log(cardWrapper.querySelector(`.${this.className}`))
      blockCardDiv.classList.add('hideBlockDiv');
      cardWrapper.querySelector(`.${this.className}`)?.classList.remove('flipped');
    });
    cardWrapper.querySelector('.card__rotate')?.addEventListener('click', (e:Event) => {
      this.listenClick(e);
    }, false);
    return <HTMLElement>cardWrapper;
  }

  viewCorrect(e:Event):void {
    const audio:Node = (e.target as HTMLElement)?.parentElement?.querySelector('audio') as Node;
    const star:string = starSvg;
    const starElement:HTMLElement = f.create('span', 'star__correct').html(star).end();
    (this.starsContainer as HTMLElement)?.appendChild(starElement);
    (e.target as HTMLElement).parentElement?.appendChild(SoundsPlay('correct'));
    setTimeout(() => {
      (e.target as HTMLElement).parentElement?.removeChild(
        (e.target as HTMLElement)?.parentElement?.querySelector('audio') as Node,
      );
    }, 200);
    (e.target as HTMLElement).closest('.card__wrapper')?.querySelector('.card__front_block')?.classList.add('correct')
  }

  viewMistakes(e:Event):void {
    const star:string = starSvg;
    const starElement:HTMLElement = f.create('span', 'star__error').html(star).end();
    (this.starsContainer as HTMLElement)?.appendChild(starElement);
    (e.target as HTMLElement).parentElement?.appendChild(SoundsPlay('error'));
    setTimeout(() => (e.target as HTMLElement).parentElement?.removeChild(
      (e.target as HTMLElement)?.parentElement?.querySelector('audio') as HTMLElement,
    ), 200);
  }

  listenClick(e:Event):void {
    console.log('---',(e.target as HTMLElement).closest(`.${this.className}`));
    (e.target as HTMLElement).closest(`.${this.className}`)?.classList.add('flipped');
  }
}
