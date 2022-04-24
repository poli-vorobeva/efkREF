import {f} from '../../../Util';
import {IApp, /*IHeader*/} from '../../interfaces';
import {Burger} from './Burger/Burger';
import './Header.scss';
import {Checkbox} from './Checkbox/Checkbox';
import {StoreType} from '../../types';
import {IPlay} from '../../StartPlay/GameController';
import {changeMode, openCategory, redraw} from '../../redux/actions';
import {playDelay} from "../../canstants";
import Control from "../../common/Control";

export class Header extends Control {

  store: StoreType;
  burger: Burger;
  onStartGame: (button: HTMLElement) => void
  onRepeatWord: () => void
  onAsideStyle: (val: string) => void
  onChangeMode: (mode: string) => void
  startGameButton: Control<HTMLElement>;
  checkbox: Checkbox;
  startButtonClicked: boolean;
  onHome:()=>void
  onRegisterForm:()=>void
  adminButton: Control<HTMLElement>;
  constructor(parentNode: HTMLElement, store: StoreType) {
    super(parentNode, 'section', 'header__wrapper')
    this.store = store
    this.burger = new Burger(this.node);
    this.burger.onAsideStyle = (val: string) => {
      this.onAsideStyle(val)
    }
    const homeButton = new Control(this.node, 'button', 'header_button_home', 'Home')
    homeButton.node.addEventListener('click', () => {
      // this.store.dispatch(redraw())
      this.onHome()
    })
    //времееная кнопка
    this.adminButton = new Control(this.node, 'button', 'adminButton', 'admin')
    this.adminButton.node.addEventListener('click', () => {
        this.store.dispatch(openCategory('ADMIN'))
    })
    const registerButton = new Control(this.node, 'button', 'header__register', 'Register/Login')
    registerButton.node.addEventListener('click', (e) => {
      //this.store.dispatch(openCategory('REGISTER'))
      this.onRegisterForm()
    })
    const statisticButton = new Control(this.node, 'button', 'header__button_statistic', 'Statistic')
    statisticButton.node.addEventListener('click', () => {
      // this.store.dispatch(openCategory('statistic'));
    });
    // this.store.subscribe(() => {
    //   if (this.store.getState().isAuth) {
    //     adminButton.node.style.display = "block"
    //   } else {
    //     adminButton.node.style.display = "none"
    //   }
    //   const currentCategory = this.store.getState().category;
    //   if (currentCategory === 'start') {
    //     // this.startGameButton.node.innerText = 'Start';
    //   }
    // });

    this.startButtonClicked = false
    //  this.showStartButton()
  }
  showAdminButton() {
    this.adminButton.node.style.display='block'
  }
defaultView(){
    this.checkbox?.destroy()
  this.startGameButton?.destroy()
}
  clickBurger() {
    console.log('header- clickBurger')
    this.burger.clickBurger()
  }
  emitChange(){
    console.log('header- emitBurger')
    this.burger.emitChange()
  }
  showStartButton() {
    this.startGameButton = new Control(this.node, 'button', 'header__button_start', 'START');

    this.startGameButton.node.onclick = () => {
      if (!this.startButtonClicked) {
        this.startButtonClicked = true
        if (this.store.getState().category !== 'start') {
          if (this.startGameButton.node.innerText === 'START') {
            this.onStartGame(this.startGameButton.node);
            this.startGameButton.node.innerText = 'REPEAT';
          } else {
            this.onRepeatWord();
          }
        }
        setTimeout(() => this.startButtonClicked = false, playDelay)

      }
    }
  }

  hideStartButton() {
    this.startGameButton.destroy()
  }

  showCheckbox() {
    this.checkbox = new Checkbox(this.node);
    this.checkbox.onChangeMode = () => {
      const mode = this.store.getState().mode === 'train' ? 'game' : 'train'
      this.onChangeMode(mode)
      this.store.dispatch(changeMode(mode))
      //console.log(mode==='game','mode')
      mode === 'game' ? this.showStartButton() : this.hideStartButton()
      // this.startGameButton.node.style.display = mode === 'game' ? 'block' : 'none'
    }
  }

  hideCheckbox() {
    this.checkbox.destroy()
  }

  getBurger() {
    return this.burger.getInput()
  }

  hideElement(button: HTMLElement) {
    //   button.style.display = 'none'
  }

  showElement(button: HTMLElement) {
    button.style.display = 'block'
  }

  finishScreenView() {
    //this.hideElement(this.startGameButton.node)
    //this.hideElement(this.checkbox.node)
    this.hideElement(this.burger.node)
  }

  categoryView() {
    //  this.startGameButton.node.innerText === 'START'
    //  this.showElement(this.startGameButton.node)
    //  this.showElement(this.checkbox.node)
    this.burger.node.style.display = 'flex'
  }
}
