import './MainContent.scss';
import {StateType, StoreType} from '../../types';
import {GameBoard} from './GameBoard/GameBoard';
import {CategoriesBoard} from './GameBoard/CategoriesBoard/CaregoriesBoard';
import {changeMode, openCategory} from '../../redux/actions';
import Control from "../../common/Control";
import {Categories, PreloadData} from "../App";
import {RegisterForm} from "./RegisterForm/RegisterForm";

export interface IMainContent {
  render(): Promise<HTMLElement>
}

export class MainContent extends Control {


  store: StoreType;
  className: string;
  private categories: Categories;
  private imagesBase64: { img: { base64: string; word: string } }[];
  categoryClick:(str:string)=>void
  public board: GameBoard;
  private content: CategoriesBoard;
  onFinishRound:(mistakes:number)=>void
  onShowCheckbox:()=>void
  private preloadData: PreloadData;
  constructor(parentNode: HTMLElement, store: StoreType, preloadData: PreloadData) {
    super(parentNode, 'main', 'main__container')
    this.store = store;
    this.preloadData=preloadData
    //this.store.dispatch({type: 'INIT'});
    this.categories = preloadData.categories
    this.imagesBase64 = preloadData.images
    this.content = new CategoriesBoard(this.node, preloadData);
    this.content.onClick = (str) => {
     this.drawBoard(str)
    }
  }
  drawBoard(str:string){
    this.board?.destroy()
    this.onShowCheckbox()
    this.content.destroy()
    this.store.dispatch(openCategory(str))
    const images = this.preloadData.categories.find(e=>e.name===str).images
    this.board =  new GameBoard(this.node,this.store,images);
    this.board.onFinishRound=(mistakes)=>{
      this.onFinishRound(mistakes)
    }
  }

  onRepeatWord() {
    this.board.getGameController().repeatWord()
  }
  onStartGame(button: HTMLElement) {
    this.board.getGameController().startGame(button)
  }
  changeMode(mode: string) {
    this.store.dispatch(changeMode(mode))
    this.board?.onChangeGameMode(mode)
  }
  onRegisterForm() {
    const register = new RegisterForm(this.node)
  }
  // render(): {
  //
  //   // console.log("CONTENT",content)
  //   // if (currentStore.category !== 'start') {
  //   //   // content =  new GameBoard(this.parent?.querySelector(`.${this.className}`) as HTMLElement,
  //   //   //   this.store, this.play);
  //   // } else {
  //   //   content.addEventListener('click', (e) => {
  //   //     const { category }:DOMStringMap = ((e.target as HTMLElement).closest('.item__wrapper') as HTMLElement).dataset;
  //   //     this.store.dispatch(openCategory(category as string));
  //   //   });
  //   // }
  //
  //   // this.store.subscribe(async() => {
  //   //   const currentStoreSub:StateType = this.store.getState();
  //   //   console.log("CUR",currentStoreSub)
  //   //   //content = await CategoriesBoard();
  //   //   if(currentStoreSub.category === 'ADMIN'){
  //   //     console.log("Ad")
  //   //     content= new AdminPage(this.store).render()
  //   //   } else if(currentStoreSub.category === 'REGISTER'){
  //   //     console.log("Reg")
  //   //     content= new RegisterForm(this.store).render()
  //   //   } else if (currentStore.category === 'statistic') {
  //   //     console.log("St")
  //   //    // content = new Statistic(this.play,this.store).render();
  //   //   } else if (currentStoreSub.category !== 'start'
  //   //     && currentStoreSub.category !== 'REGISTER'
  //   //   && currentStore.category !== 'statistic'
  //   //     && currentStoreSub.category !== 'ADMIN'
  //   //   ) {
  //   //     console.log("NotStart")
  //   //     // content = await new GameBoard(this.parent?.querySelector(`.${this.className}`) as HTMLElement,
  //   //     //   this.store)
  //   //   } else {
  //   //     content.addEventListener('click', (e) => {
  //   //       const { category }:DOMStringMap = ((e.target as HTMLElement).closest('.item__wrapper') as HTMLElement).dataset;
  //   //       this.store.dispatch(openCategory(category as string));
  //   //     });
  //   //   }
  //   //   mainContentContainer.innerHTML = '';
  //
  //   // });
  //   // return mainContentContainer;
  // }
}
