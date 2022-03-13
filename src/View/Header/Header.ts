import { f } from '../../../Util';
import { IApp, /*IHeader*/ } from '../../interfaces';
import { Burger } from './Burger/Burger';
import './Header.scss';
import { Checkbox } from './Checkbox/Checkbox';
import { StoreType } from '../../types';
import { IPlay } from '../../StartPlay/Play';
import {changeMode, openCategory, redraw} from '../../redux/actions';
import {playDelay} from "../../canstants";
import Control from "../../common/Control";

export class Header extends Control{
  store: StoreType;
  burger: Burger;
  constructor(parentNode:HTMLElement,store:StoreType) {
    super(parentNode,'section', 'header__wrapper')
    this.store=store
    this.burger = new Burger(this.node);
    const checkbox = new Checkbox(this.node);
    const homeButton=new Control(this.node,'button','header_button_home','Home')
    homeButton.node.addEventListener('click',()=>{
     // this.store.dispatch(redraw())
    })
    //времееная кнопка
    const adminButton= new Control(this.node,'button','adminButton','admin')
    adminButton.node.addEventListener('click',()=> {
    //  this.store.dispatch(openCategory('ADMIN'))
    })
    const registerButton=new Control(this.node,'button','header__register','Register/Login')
      registerButton.node.addEventListener('click',(e)=>{
        this.store.dispatch(openCategory('REGISTER'))
      })
    const statisticButton = new Control(this.node,'button', 'header__button_statistic','Statistic')
     statisticButton.node.addEventListener('click', () => {
      // this.store.dispatch(openCategory('statistic'));
     });
    const startGameButton = new Control(this.node,'button', 'header__button_start', 'START');
       this.store.subscribe(() => {
      if(this.store.getState().isAuth){
        adminButton.node.style.display="block"
      }else{
        adminButton.node.style.display="none"
      }
    //   if (header.querySelector('.header__button_start')) {
    //     header.removeChild(header.querySelector('.header__button_start') as Node);
    //   }
    //   if (this.store.getState().mode === 'game') {
    //
    //   }
      const currentCategory = this.store.getState().category;
      // console.log(currentStore)
      if (currentCategory === 'start') {
        startGameButton.node.innerText = 'Start';
      }
    });

let startButtonClicked=false
    startGameButton.node.addEventListener('click', (e) => {
      if(!startButtonClicked){
        startButtonClicked=true
        if (this.store.getState().category !== 'start') {
          if ((e.target as HTMLElement).innerText === 'START') {
         //   this.play.startGame(startGameButton);
            (e.target as HTMLElement).innerText = 'REPEAT';
          } else {
          //  this.play.repeatWord();
          }
        }
        setTimeout(()=> startButtonClicked=false,playDelay)

      }
    });

//     return header;
   }
   getBurger(){
    return this.burger.getInput()
   }
}
