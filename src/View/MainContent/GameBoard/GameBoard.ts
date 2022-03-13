import './GameBoard.scss';
import {f, IHelper} from '../../../../Util';
import {StoreType} from '../../../types';
import {categoriesStorage} from '../../../storage/imagesStorage';
import {GameBoardItem} from './GameBoardItem/GameBoardItem';
import {IPlay} from '../../../StartPlay/Play';
import {getCategories} from "../../../storage/serverRequests";
import Control from "../../../common/Control";

export interface IGameBoard {
  render(): Promise<HTMLElement>
}

export class GameBoard extends Control {
   store:StoreType;

  starsContainer: null | HTMLElement;

  constructor(parentNode: HTMLElement,store:StoreType,images:string[]/*parent:HTMLElement, store:StoreType, play:IPlay*/) {
    super(parentNode,'section', 'gameBoard__wrapper')
    this.store = store;
    // this.parent = parent;
    // this.play = play;
    //this.play.init();
    this.starsContainer = null;
    const currentCategory: string = this.store.getState().category as string;
    const imagesArray: string[] = images;
    const categoryTitle = new Control(this.node, 'h4', 'category__title', currentCategory)
    const starsWrapper = new Control(this.node, 'div', 'stars__wrapper')
    const starsContainer = new Control(starsWrapper.node, 'div', 'stars__container')
    const gameBoardCards = new Control(this.node,'div', 'gameBoard__cards_wrapper')

    imagesArray.forEach((item: string) => {
      const boardItem=new GameBoardItem(gameBoardCards.node,currentCategory as string, item,this.store)
      //   gameBoardCards.append(new GameBoardItem(this.parent?.querySelector(`.${this.className}`) as HTMLElement,
      //     this.store, this.play, this.starsContainer as HTMLElement).render(currentCategory as string, item));
      // });

    })
  }
  }
