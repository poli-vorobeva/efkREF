import './FinishScreen.scss';
import { f } from '../../../Util';
import { SoundsPlay } from '../../StartPlay/SoundsPlay/SoundsPlay';
import { StoreType } from '../../types';
import { changeMode, redraw } from '../../redux/actions';
import Control from "../../common/Control";

export class FinishScreen extends Control{
  destroyFinishScreen:()=>void
  constructor(parentNode:HTMLElement,mistakes:number) {
    super(parentNode,'div', 'finishScreen__wrapper');
    const sound = new SoundsPlay(this.node,mistakes === 0 ? 'success' : 'failure');
    const smileElement = new Control(this.node,'span', 'finishScreen__smile')
    const smileImage = new Control(smileElement.node,'img')
      smileImage.node.setAttribute('src',
      `./assets/img/${mistakes === 0 ? 'success' : 'failure'}.jpg`)
    const mistakesTitle= new Control(this.node,'h4','finishScreen__title',
      `Сделано ${mistakes} ошибки(а)`)
   setTimeout(() => {
      sound.destroy()
      this.destroyFinishScreen()
    }, 2000);
  }
}
