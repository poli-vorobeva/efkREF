import {f} from '../../../../Util';
import './Checkbox.scss';
import {StoreType} from '../../../types';
import {changeMode} from '../../../redux/actions';
import Control from "../../../common/Control";

interface ICheckbox {
  render(): HTMLElement
}

export class Checkbox extends Control {

  change: (e: Event) => void;
  onChangeMode: () => void;
  private switcher: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'header__checkbox')
    this.change = function (e: Event) {
      console.log('%^%')
      this.onChangeMode()
      //const train: boolean = (e.target as HTMLInputElement)?.checked;
    };
    const input = new Control(this.node, 'input', 'header__checkbox')
    input.node.setAttribute('type', 'checkbox')
    const switcherWrapper = new Control(this.node, 'div', 'switcher__wrapper')
    const inputText = new Control(switcherWrapper.node, 'div', 'text')
    this.switcher = new Control(switcherWrapper.node, 'div', 'switcher__circle')
    const spanGame = new Control(inputText.node, 'span', 'game', 'Game')
    spanGame.node.setAttribute('data-mode', 'game')
    const spanTrain = new Control(inputText.node, 'span', 'train', 'Train')
    spanTrain.node.setAttribute('data-mode', 'train')
    input.node.onchange = (e) => {
      this.switcherTransition().then((r) => this.change(e))
    }
  }

  switcherTransition() {
    return new Promise((res) => {
      this.switcher.node.ontransitionend = () => res(null)
    })
  }

  hide() {
    this.node.style.display = 'none'
  }

  show() {
    this.node.style.display = 'block'
  }
}
