import { f } from '../../../Util';
import './MainContent.scss';
import { StateType, StoreType } from '../../types';
import { GameBoard } from './GameBoard/GameBoard';
import { CategoriesBoard } from './GameBoard/CategoriesBoard/CaregoriesBoard';
import { openCategory } from '../../redux/actions';
import { IPlay } from '../../StartPlay/Play';
import { Statistic } from '../Statistic/Statistic';
import {AdminPage} from "../AdminPage/AdminPage";
import {RegisterForm} from "./RegisterForm/RegisterForm";

export interface IMainContent {
  render():Promise<HTMLElement>
}
export class MainContent implements IMainContent {
  store:StoreType;

  className:string;

  parent:HTMLElement;

  play:IPlay;

  constructor(parent:HTMLElement, store:StoreType, play:IPlay) {
    this.store = store;
    this.className = 'main__container';
    this.parent = parent;
    this.play = play;
  }

  async render():Promise<HTMLElement> {

    this.store.dispatch({ type: 'INIT' });
    const currentStore:StateType = this.store.getState();
    let content:HTMLElement = await CategoriesBoard();
    console.log('!!!', currentStore.category, currentStore);

    if (currentStore.category !== 'start') {

      content =  await new GameBoard(this.parent?.querySelector(`.${this.className}`) as HTMLElement,
        this.store, this.play).render();
    } else {
      content.addEventListener('click', (e) => {
        const { category }:DOMStringMap = ((e.target as HTMLElement).closest('.item__wrapper') as HTMLElement).dataset;
        this.store.dispatch(openCategory(category as string));
      });
    }
    const mainContentContainer = f.create('main', this.className).append(content).end();
    this.store.subscribe(async() => {
      const currentStoreSub:StateType = this.store.getState();
      content = await CategoriesBoard();
      if(currentStoreSub.category === 'ADMIN'){
        console.log("Ad")
        content= new AdminPage(this.store).render()
      } else if(currentStoreSub.category === 'REGISTER'){
        console.log("Reg")
        content= new RegisterForm(this.store).render()
      } else if (currentStore.category === 'statistic') {
        console.log("St")
        content = new Statistic(this.play,this.store).render();
      } else if (currentStoreSub.category !== 'start'
        && currentStoreSub.category !== 'REGISTER'
      && currentStore.category !== 'statistic'
        && currentStoreSub.category !== 'ADMIN'
      ) {
        console.log("NotStart")
        content = await new GameBoard(this.parent?.querySelector(`.${this.className}`) as HTMLElement,
          this.store, this.play).render();
      } else {
        content.addEventListener('click', (e) => {
          const { category }:DOMStringMap = ((e.target as HTMLElement).closest('.item__wrapper') as HTMLElement).dataset;
          this.store.dispatch(openCategory(category as string));
        });
      }
      mainContentContainer.innerHTML = '';
      mainContentContainer.appendChild(content);
    });
    return mainContentContainer;
  }
}
