import { f } from '../../../../Util';
import './Burger.scss';

export interface IBurger{
  render():HTMLElement
}
export function Burger():HTMLElement {
  const span1:HTMLElement = f.create('span', 'burger__span1').end();
  const span2:HTMLElement = f.create('span', 'burger__span2').end();
  const span3:HTMLElement = f.create('span', 'burger__span3').end();
  const input:HTMLElement = f.create('input').end();
  input.setAttribute('type', 'checkbox');
  const burger:HTMLElement = f.create('div', 'burger__wrapper')
    .append(input).append(span1).append(span2)
    .append(span3)
    .end();

input.addEventListener('click',()=>{
  if((input as HTMLInputElement).checked==true){
    const aside=document.querySelector('.aside__wrapper');
    (aside as HTMLElement).style.left='0'
  }else{
    console.log('false')
    const aside=document.querySelector('.aside__wrapper');
    (aside as HTMLElement).style.left='-150px'
  }
})
  return burger;
}
