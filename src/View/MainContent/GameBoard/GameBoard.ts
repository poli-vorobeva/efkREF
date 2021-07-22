import './GameBoard.scss';
import { f, IHelper } from '../../../../Util';
import { StoreType } from '../../../types';
import { categoriesStorage } from '../../../storage/imagesStorage';
import { GameBoardItem } from './GameBoardItem/GameBoardItem';
import { IPlay } from '../../../StartPlay/Play';
import {getCategories} from "../../../storage/serverRequests";

export interface IGameBoard{
  render():Promise<HTMLElement>
}
export class GameBoard implements IGameBoard {
  store:StoreType;

  className:string;

  parent:HTMLElement;

  play:IPlay;

  starsContainer:null|HTMLElement;

  constructor(parent:HTMLElement, store:StoreType, play:IPlay) {
    this.store = store;
    this.className = 'gameBoard__wrapper';
    this.parent = parent;
    this.play = play;
    this.starsContainer = null;
  }

 async render():Promise<HTMLElement> {
    this.play.init();

    const currentCategory:string = this.store.getState().category as string;
    const imagesArray:string[] = categoriesStorage[currentCategory].images as string[];
    const categoryTitle:HTMLElement = f.create('h4', 'category__title').text(currentCategory).end();
    const starsContainer:HTMLElement = f.create('div', 'stars__container').end();
    const starsWrapper:HTMLElement = f.create('div', 'stars__wrapper').append(starsContainer).end();
    this.starsContainer = starsContainer;

    const gameBoardWrapper:IHelper = f.create('section', this.className).append(categoryTitle);
    gameBoardWrapper.append(starsWrapper);
    const gameBoardCards= f.create('div','gameBoard__cards_wrapper').end()
    imagesArray.forEach((item:string) => {
      gameBoardCards.append(new GameBoardItem(this.parent?.querySelector(`.${this.className}`) as HTMLElement,
        this.store, this.play, this.starsContainer as HTMLElement).render(currentCategory as string, item));
    });
    gameBoardWrapper.append(gameBoardCards);
    return gameBoardWrapper.end();
  }
}
