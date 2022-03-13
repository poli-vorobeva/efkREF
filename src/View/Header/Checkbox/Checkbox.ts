import {f} from '../../../../Util';
import './Checkbox.scss';
import {StoreType} from '../../../types';
import {changeMode} from '../../../redux/actions';
import Control from "../../../common/Control";

interface ICheckbox {
  render(): HTMLElement
}

export class Checkbox extends Control{
 // store: StoreType;

  change: (e: Event) => void;

  constructor(parentNode:HTMLElement) {
    super(parentNode,'div','header__checkbox')
   // this.store = store;
    this.change = function (e: Event) {
      const train: boolean = (e.target as HTMLInputElement)?.checked;
      //this.store.dispatch(changeMode(train ? 'game' : 'train'));
    };
    const input = new Control(this.node, 'input', 'header__checkbox')
    input.node.setAttribute('type', 'checkbox')
    const switcherWrapper = new Control(this.node, 'div', 'switcher__wrapper')
    const inputText = new Control(switcherWrapper.node, 'div', 'text')
    const switcher = new Control(switcherWrapper.node, 'div', 'switcher__circle')
    const spanGame = new Control(inputText.node, 'span', 'game', 'Game')
    spanGame.node.setAttribute('data-mode', 'game')
    const spanTrain = new Control(inputText.node, 'span', 'train', 'Train')
    spanTrain.node.setAttribute('data-mode', 'train')
    input.node.addEventListener('change', this.change.bind(this));
  }
}
