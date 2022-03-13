import { f, IHelper } from '../../../Util';
import './AsideMenu.scss';
import { categoriesStorage } from '../../storage/imagesStorage';
import { StoreType } from '../../types';
import { openCategory } from '../../redux/actions';
import {IPlay} from "../../StartPlay/Play";
import Control from "../../common/Control";

export interface IAsideMenu {
  render():HTMLElement
}
export class AsideMenu extends Control{
 // store:StoreType;
//play:IPlay
  constructor(parentNode:HTMLElement,burger:HTMLInputElement) {
  super(parentNode,'aside', 'aside__wrapper')
    //this.store = store;
   // this.play=play
    const ul = new Control(this.node,'ul')
    Object.keys(categoriesStorage).forEach((category) => {
      const categoryItem = new Control(ul.node, 'li', '', category)
      categoryItem.node.addEventListener('click', () => {
        //this.store.dispatch(openCategory(category));
        burger.checked = false
        this.node.style.left = '-150px'
      });
    })
    this.node.addEventListener('mouseleave', () => {
      parentNode.addEventListener('click', (e) => {
        if(burger && !(e.target as HTMLElement).closest('.aside__wrapper') && burger.checked){
          // console.log("not input not aside")
          burger.checked=false
          this.node.style.left='-150px'
        }
        //this.play.mistakes=0
        //this.play.defaultGame()
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
}
