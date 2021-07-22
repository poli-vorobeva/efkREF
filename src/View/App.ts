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
// import {createStore} from "../redux/createStore";

export class App implements IApp {
  header:HTMLElement;

  aside:HTMLElement;

  //mainContent:HTMLElement;

  store:StoreType;

  pageWrapperClass:string;

  play:IPlay;

  parentElement:HTMLElement;
footer:HTMLElement
  constructor() {
    this.store = createStore(rootReducer, initialState);
    this.pageWrapperClass = 'page__wrapper';
    this.parentElement = document.querySelector('body') as HTMLElement;
    this.play = new Play(this.store, this.parentElement);
    this.aside = new AsideMenu(this.store,this.play).render();
    this.header = new Header(this.aside, this.store, this).render();
    //this.mainContent = new MainContent(this.parentElement.querySelector(`.${this.pageWrapperClass}`) as HTMLElement,
    //  this.store, this.play).render();
    this.footer= Footer()
  }

  async render():Promise<HTMLElement> {
  localStorage.clear()
    const app = f.create('main', this.pageWrapperClass)
      .append(this.header).append(this.aside)
      .append(await new MainContent(this.parentElement.querySelector(`.${this.pageWrapperClass}`) as HTMLElement,
        this.store, this.play).render())
      .append(this.footer)
      .end();
    return app;
  }

  async init():Promise<HTMLElement> {
    const content = this.render();
    Object.keys(superObject).forEach(el=>{

  //console.log(JSON.stringify(superObject[el]))
  if (!localStorage.getItem(el)){
    localStorage.setItem(el,JSON.stringify(superObject[el]))
  }
  //asyncLocalStorage.setItem(el,JSON.stringify(superObject[el]))
  // console.log('#',asyncLocalStorage.getItem(el))
  //asyncLocalStorage.setItem('DataObject', ...superObject)
})

    return content;
  }
}
