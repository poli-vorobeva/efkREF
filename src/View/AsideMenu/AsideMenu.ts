import { f, IHelper } from '../../../Util';
import './AsideMenu.scss';
import { categoriesStorage } from '../../storage/imagesStorage';
import { StoreType } from '../../types';
import { openCategory } from '../../redux/actions';
import {IPlay} from "../../StartPlay/Play";

export interface IAsideMenu {
  render():HTMLElement
}
export class AsideMenu implements IAsideMenu {
  store:StoreType;
play:IPlay
  constructor(store:StoreType,play:IPlay) {
    this.store = store;
    this.play=play
  }

  render():HTMLElement {
    const asideWrapper:HTMLElement = f.create('aside', 'aside__wrapper').end();
    this.store.subscribe(()=>{
      if(this.store.getState().category!=='start'){
        asideWrapper.querySelectorAll('li').forEach(i=>{
          if(i.innerText.toLowerCase()===this.store.getState().category){
          i.classList.add('aside__active_item')
        }else{
            i.classList.remove('aside__active_item')
          }
        })
      }

    })
    const ul:IHelper = f.create('ul');
    Object.keys(categoriesStorage).forEach((category) => {
      const categoryItem:HTMLElement = f.create('li').text(category).end();
      categoryItem.addEventListener('click', () => {
        this.store.dispatch(openCategory(category));
        const burger=document.querySelector('.burger__wrapper')?.querySelector('input');
        (burger as HTMLInputElement).checked=false
        asideWrapper.style.left='-150px'
      });
      ul.append(categoryItem);
    });
    asideWrapper.addEventListener('mouseleave', () => {
      asideWrapper.parentElement?.addEventListener('click', (e) => {
        //console.log(e.target)
        if(e.target!==document.querySelector('.burger__wrapper')?.querySelector('input') &&
          !(e.target as HTMLElement).closest('.aside__wrapper') &&
          document.querySelector('.burger__wrapper')?.querySelector('input')?.checked){
         // console.log("not input not aside")
          const burger=document.querySelector('.burger__wrapper')?.querySelector('input');
          (burger as HTMLInputElement).checked=false
           asideWrapper.style.left='-150px'
        }
        //this.play.mistakes=0
        this.play.defaultGame()
       },false);
    },false);
    const asideBlock:HTMLElement = f.in(asideWrapper).append(ul.end()).end();
    return asideBlock;
  }
}
