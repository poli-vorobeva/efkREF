import { f } from '../../../../Util';
import './Burger.scss';
import Control from "../../../common/Control";

export interface IBurger{
  render():HTMLElement
}
export class Burger extends Control{
  private input:Control<HTMLInputElement>
  constructor(parentNode:HTMLElement){
    super(parentNode,'div', 'burger__wrapper')
    this.input = new Control(this.node,'input')
    this.input.node.setAttribute('type', 'checkbox');
    const span1 = new Control(this.node,'span', 'burger__span1')
    const span2 = new Control(this.node,'span', 'burger__span2')
    const span3 = new Control(this.node,'span', 'burger__span3')
    this.input.node.addEventListener('click',()=>{
      if(this.input.node.checked==true){
        const aside=document.querySelector('.aside__wrapper');
        (aside as HTMLElement).style.left='0'
      }else{
        console.log('false')
        const aside=document.querySelector('.aside__wrapper');
        (aside as HTMLElement).style.left='-150px'
      }
    })
  }
  getInput(){
    return this.input.node
  }
}
