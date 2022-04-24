import {f} from '../../../../Util';
import './Burger.scss';
import Control from "../../../common/Control";

export interface IBurger {
  render(): HTMLElement
}

export class Burger extends Control {

  private input: Control<HTMLInputElement>
  onAsideStyle: (value: string) => void

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'burger__wrapper')
    this.input = new Control(this.node, 'input')
    this.input.node.setAttribute('type', 'checkbox');
    const span1 = new Control(this.node, 'span', 'burger__span1')
    const span2 = new Control(this.node, 'span', 'burger__span2')
    const span3 = new Control(this.node, 'span', 'burger__span3')
    this.input.node.onclick = () => this.clickBurger()
  }

  emitChange() {
    this.input.node.checked = !this.input.node.checked;
    this.input.node.dispatchEvent(new Event('change'))
    this.clickBurger()
  }

  clickBurger() {
    if (this.input.node.checked == true) {
      this.onAsideStyle('show')
    } else {
      this.onAsideStyle('hide')
    }
  }

  getInput() {
    return this.input.node
  }

  hide() {
    this.node.style.display = 'none'
  }

  show() {
    this.node.style.display = 'block'
  }
}
