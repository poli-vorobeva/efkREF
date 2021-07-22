import { f } from '../../../Util';
import { IApp, IHeader } from '../../interfaces';
import { Burger } from './Burger/Burger';
import './Header.scss';
import { Checkbox } from './Checkbox/Checkbox';
import { StoreType } from '../../types';
import { IPlay } from '../../StartPlay/Play';
import {changeMode, openCategory, redraw} from '../../redux/actions';
import {playDelay} from "../../canstants";



export class Header implements IHeader {
  aside:HTMLElement;

  store:StoreType;

  parent:IApp;

  play:IPlay;

  constructor(aside:HTMLElement, store:StoreType, parent:IApp) {
    this.aside = aside;
    this.store = store;
    this.parent = parent;
    this.play = this.parent.play;
  }

  render():HTMLElement {
    const burger:HTMLElement = Burger();
    const checkbox:HTMLElement = new Checkbox(this.store).render();
    const header:HTMLElement = f.create('section', 'header__wrapper').append(burger).append(checkbox).end();
    const startGameButton:HTMLElement = f.create('button', 'header__button_start').text('Start').end();
    const homeButton:HTMLElement=f.create('button','header_button_home').text('Home').end()
    homeButton.addEventListener('click',()=>{
      this.store.dispatch(redraw())
    })
    header.appendChild(homeButton)
    const statisticButton:HTMLElement = f.create('button', 'header__button_statistic').text('Statistic').end();
    statisticButton.addEventListener('click', () => {
      this.store.dispatch(openCategory('statistic'));
    });
//времееная кнопка
    const adminButton= f.create('button','adminButton').text('admin').end()
    adminButton.addEventListener('click',()=>this.store.dispatch(openCategory('ADMIN')))

    //
  //
  const registerButton=f.create('button','header__register').text('Register/Login').end()
    registerButton.addEventListener('click',(e)=>{
      this.store.dispatch(openCategory('REGISTER'))
    })

    this.store.subscribe(() => {
      if(this.store.getState().isAuth){
        adminButton.style.display="block"
      }else{
        adminButton.style.display="none"
      }
      if (header.querySelector('.header__button_start')) {
        header.removeChild(header.querySelector('.header__button_start') as Node);
      }
      if (this.store.getState().mode === 'game') {
        header.appendChild(startGameButton);
        startGameButton.innerText='START'
      }
      const currentCategory = this.store.getState().category;
      // console.log(currentStore)
      if (currentCategory === 'start') {
        startGameButton.innerText = 'Start';
      }
    });

let startButtonClicked=false
    startGameButton.addEventListener('click', (e) => {
      if(!startButtonClicked){
        startButtonClicked=true
        if (this.store.getState().category !== 'start') {
          if ((e.target as HTMLElement).innerText === 'START') {
            this.play.startGame(startGameButton);
            (e.target as HTMLElement).innerText = 'REPEAT';
          } else {
            this.play.repeatWord();
          }
        }
        setTimeout(()=> startButtonClicked=false,playDelay)

      }


    });
    header.appendChild(adminButton)
    header.appendChild(registerButton);
    header.appendChild(statisticButton);
    return header;
  }
}
