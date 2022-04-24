import {createStore} from 'redux';
import {IInitialState, initialState, rootReducer} from '../redux/rootReducer';
import {Header} from './Header/Header';
import {f} from '../../Util';
import './App.scss';
import {AsideMenu} from './AsideMenu/AsideMenu';
import {MainContent} from './MainContent/MainContent';
import {ActionType, StoreType} from '../types';
import {IPlay} from '../StartPlay/GameController';
import {IApp} from '../interfaces';
import {Footer} from "./Footer/Footer";
import {asyncLocalStorage} from "../canstants";
import {superObject} from "../storage/imagesStorage";
import Control from "../common/Control";
import {CategoriesBoard} from "./MainContent/GameBoard/CategoriesBoard/CaregoriesBoard";
import {FinishScreen} from "./FinishScreen/FinishScreen";
// import {createStore} from "../redux/createStore";
type CategoriesItem = {
  name: string,
  title: string,
  images: string[]
}
export type Categories = CategoriesItem[]
export type PreloadData = {
  categories: Categories,
  images: { img: { base64: string, word: string } }[]
}

export class App extends Control {
  store: any;
  mainContent: MainContent;
  aside: AsideMenu;
  header: Header;
  preloadData: PreloadData;
  // header:HTMLElement;
  //mainContent:HTMLElement;
//footer:HTMLElement
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'main', 'page__wrapper')

  }

  render(preloadData: PreloadData) {
    this.preloadData = preloadData
    this.store = createStore(rootReducer, initialState);
    //this.pageWrapperClass = ;
    //  const app = new Control(this.node,)
    this.header = new Header(this.node, this.store)
    this.header.onRegisterForm=()=>{
     this.mainContent.onRegisterForm()
    }
    this.header.onHome=()=>{
      this.mainContent?.destroy()
      this.drawMainContent()
      this.header.defaultView()
    }
    this.header.onAsideStyle = (value) => {
      this.aside.setLeftStyle(value)
    }
    this.header.onRepeatWord = () => {
      this.mainContent.onRepeatWord()
    }
    this.header.onStartGame = (button) => {
      this.mainContent.onStartGame(button)
    }
    this.header.onChangeMode = (mode) => {
      this.mainContent.changeMode(mode)
    }
    // this.parentElement = document.querySelector('body') as HTMLElement;
    //  this.play = new Play(this.store, this.parentElement);
    this.aside = new AsideMenu(this.node, this.header.getBurger());
    this.aside.emitChange= () => {
      this.header.emitChange()
    }
    this.aside.onChooseCategory = (category: string) => {
      this.mainContent.drawBoard(category)
    }
    this.drawMainContent()
    // this.footer= Footer()
  }

  drawMainContent() {
    this.mainContent = new MainContent(this.node, this.store, this.preloadData)
    this.mainContent.onShowAdminButton=()=>{
      this.header.showAdminButton()
    }
    this.mainContent.onShowCheckbox = () => {
      this.header.showCheckbox()
    }
    this.mainContent.categoryClick = (str: string) => {
    }
    this.mainContent.onFinishRound = (mistakes) => {
      this.mainContent.destroy()
      const finishScreen = new FinishScreen(this.node, mistakes)
      this.header.hideCheckbox()

      this.header.finishScreenView()
      finishScreen.destroyFinishScreen = () => {
        finishScreen.destroy()
        this.header.hideStartButton()
        this.drawMainContent()
        //   this.mainContent= new MainContent(this.node, this.store, preloadData)
        this.header.categoryView()
      }
    }
  }

  // init(): void {
  //   //  const content = this.render();
  //   Object.keys(superObject).forEach(el => {
  //
  //     if (!localStorage.getItem(el)) {
  //       localStorage.setItem(el, JSON.stringify(superObject[el]))
  //     }
  //   })
  //
  //   //  return content;
  // }
}
