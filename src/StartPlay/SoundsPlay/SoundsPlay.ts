import { f } from '../../../Util';
import Control from "../../common/Control";

export class SoundsPlay extends Control{
  constructor(parentNode:HTMLElement,option:string){
    super(parentNode,'audio')
    console.log(option,'@@#')
      this.node.setAttribute('src', `./assets/audio/${option}.mp3`)
        this.node.setAttribute('autoplay', 'true')
  }
}
