import './GameBoard.scss';
import {f, IHelper} from '../../../../Util';
import {StoreType} from '../../../types';
import {categoriesStorage} from '../../../storage/imagesStorage';
import {GameBoardItem} from './GameBoardItem/GameBoardItem';
import {GameController, IPlay} from '../../../StartPlay/GameController';
import {getCategories} from "../../../storage/serverRequests";
import Control from "../../../common/Control";
import {starSvg} from "../../../canstants";

export interface IGameBoard {
  render(): Promise<HTMLElement>
}

export class GameBoard extends Control {
   store:StoreType;
  starsContainer: Control<HTMLElement>;
  private gameController: GameController;
  private imagesArray: string[];
  private currentCategory: string;
  private gameBoardCards: Control<HTMLElement>;
  onFinishRound:(mistakes:number)=>void
  constructor(parentNode: HTMLElement,store:StoreType,images:string[]) {
    super(parentNode,'section', 'gameBoard__wrapper')
    this.store = store;
    this.starsContainer = null;
    this.currentCategory = this.store.getState().category as string;
    this.imagesArray = images;
    const categoryTitle = new Control(this.node, 'h4', 'category__title', this.currentCategory)
    const starsWrapper = new Control(this.node, 'div', 'stars__wrapper')
    this.starsContainer = new Control(starsWrapper.node, 'div', 'stars__container')

this.createBoardItems()
  }
  getGameController(){
    return this.gameController
  }
  drawStar(className:string){
    const star: string = starSvg;
    const starElement = new Control(this.starsContainer.node,'span',
      className)
      starElement.node.innerHTML=star
  }
  createBoardItems(){
    this.gameController= new GameController(this.store,this.node,this.imagesArray)
   this.gameController.onFinishRound=(mistakes)=>{
      this.onFinishRound(mistakes)
    }
    this.gameBoardCards = new Control(this.node,'div', 'gameBoard__cards_wrapper')
    this.imagesArray.forEach((item: string) => {
      const boardItem=new GameBoardItem(this.gameBoardCards.node,this.currentCategory as string, item,this.store)
      boardItem.addStar=(className)=>{
        this.drawStar(className)
      }
      boardItem.onTrainClick=(word:string)=>{
        this.gameController.trainClick(word)
      }
      boardItem.onGameClick=(word)=>{
        return this.gameController.gameClick(word)
      }
      boardItem.removeRandomAudio=()=>{
        this.gameController.removeRandomAudio()
      }
      //   gameBoardCards.append(new GameBoardItem(this.parent?.querySelector(`.${this.className}`) as HTMLElement,
      //     this.store, this.play, this.starsContainer as HTMLElement).render(currentCategory as string, item));
      // });

    })
  }
  onChangeGameMode(mode: string) {
    console.log("MODE",mode)
    this.gameBoardCards.destroy()
    this.createBoardItems()
  }
}
