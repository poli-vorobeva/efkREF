import { createStore } from 'redux';
import { IInitialState, initialState, rootReducer } from '../redux/rootReducer';
import { Header } from './Header/Header';
import { f } from '../../Util';
import './App.scss';
import { AsideMenu } from './AsideMenu/AsideMenu';
import { MainContent } from './MainContent/MainContent';
import { ActionType, StoreType } from '../types';
import { IPlay, Play } from '../StartPlay/Play';
import { IApp } from '../interfaces';
import {Footer} from "./Footer/Footer";
import {asyncLocalStorage} from "../canstants";
import { superObject} from "../storage/imagesStorage";
import Control from "../common/Control";
import {CategoriesBoard} from "./MainContent/GameBoard/CategoriesBoard/CaregoriesBoard";
// import {createStore} from "../redux/createStore";
type CategoriesItem={
  name:string,
  title:string,
  images:string[]
}
export type Categories=CategoriesItem[]
export type PreloadData={
  categories:Categories,
  images:{img:{base64:string,word:string}}[]
}
export class App extends Control {
  store: any;
  mainContent: MainContent;
  aside: AsideMenu;
  // header:HTMLElement;

  // aside:HTMLElement;

  //mainContent:HTMLElement;

//  store:StoreType;
//  aside: AsideMenu;
//  mainContent: MainContent;

  // pageWrapperClass:string;

  // play:IPlay;

//  parentElement:HTMLElement;
//footer:HTMLElement
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'main', 'page__wrapper')

  }

  render(preloadData:PreloadData) {
    this.store = createStore(rootReducer, initialState);
    //this.pageWrapperClass = ;
    //  const app = new Control(this.node,)
    const header = new Header(this.node, this.store)
    // this.parentElement = document.querySelector('body') as HTMLElement;
    //  this.play = new Play(this.store, this.parentElement);
    this.aside = new AsideMenu(this.node, header.getBurger());
    this.mainContent = new MainContent(this.node, this.store,preloadData)
    this.mainContent.categoryClick=(str:string)=>{
      console.log("strMain",str)
    }
    // this.footer= Footer()
  }

  // render():void {
  //  localStorage.clear()
  //  }

  init(): void {
    //  const content = this.render();
    Object.keys(superObject).forEach(el => {

      if (!localStorage.getItem(el)) {
        localStorage.setItem(el, JSON.stringify(superObject[el]))
      }
    })

    //  return content;
  }
}
