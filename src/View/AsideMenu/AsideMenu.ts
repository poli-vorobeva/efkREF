import { f, IHelper } from '../../../Util';
import './AsideMenu.scss';
import { categoriesStorage } from '../../storage/imagesStorage';
import { StoreType } from '../../types';
import { openCategory } from '../../redux/actions';
import {IPlay} from "../../StartPlay/GameController";
import Control from "../../common/Control";

export interface IAsideMenu {
  render():HTMLElement
}
export class AsideMenu extends Control{
 // store:StoreType;
//play:IPlay
 // clickBurger:()=>void
  emitChange:()=>void
  onChooseCategory:(category:string)=>void
  private asideStyle: string;
  constructor(parentNode:HTMLElement,burger:HTMLInputElement) {
  super(parentNode,'aside', 'aside__wrapper')
    //this.store = store;
   // this.play=play
    this.asideStyle='hide'
    const ul = new Control(this.node,'ul')
    Object.keys(categoriesStorage).forEach((category) => {
      const categoryItem = new Control(ul.node, 'li', '', category)
      categoryItem.node.addEventListener('click', () => {
        //this.store.dispatch(openCategory(category));
      //  burger.checked = false
       // this.setLeftStyle('hide')
        //this.clickBurger()
        this.emitChange()
        this.onChooseCategory(category)
      });
    })
    this.node.addEventListener('mouseleave', () => {
      parentNode.addEventListener('click', (e) => {
        if((e.target as HTMLElement).getAttribute('type')!='checkbox' && this.asideStyle==='show'){
          this.emitChange()
        }

      },false);
    },false);
    // this.store.subscribe(()=>{
    //   if(this.store.getState().category!=='start'){
    //     asideWrapper.querySelectorAll('li').forEach(i=>{
    //       if(i.innerText.toLowerCase()===this.store.getState().category){
    //       i.classList.add('aside__active_item')
    //     }else{
    //         i.classList.remove('aside__active_item')
    //       }
    //     })
    //   }
    // })
  }
  setLeftStyle(value:string){
   (value==='show')?this.node.style.left='0':this.node.style.left='-150px'
    this.asideStyle=value
  }
}
