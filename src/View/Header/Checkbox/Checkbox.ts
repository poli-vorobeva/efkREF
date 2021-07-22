import { f } from '../../../../Util';
import './Checkbox.scss';
import { StoreType } from '../../../types';
import { changeMode } from '../../../redux/actions';

interface ICheckbox {
  render():HTMLElement
}
export class Checkbox implements ICheckbox {
  store:StoreType;

  change:(e:Event)=>void;

  constructor(store:StoreType) {
    this.store = store;
    this.change = function (e:Event) {
      const train :boolean = (e.target as HTMLInputElement)?.checked;
      this.store.dispatch(changeMode(train ? 'game' : 'train'));
    };
  }

  render():HTMLElement {
    const input:HTMLElement = f.create('input', 'header__checkbox').attribute('type', 'checkbox').end();
    const spanGame:HTMLElement = f.create('span', 'game').attribute('data-mode', 'game').text('Game').end();
    const spanTrain :HTMLElement = f.create('span', 'train').attribute('data-mode', 'train').text('Train').end();
    const inputText :HTMLElement = f.create('div', 'text').append(spanGame).append(spanTrain).end();
    const switcher :HTMLElement = f.create('div', 'switcher__circle').end();
    const switcherWrapper :HTMLElement = f.create('div', 'switcher__wrapper').append(inputText).append(switcher).end();
    const checkboxWrapper :HTMLElement = f.create('div', 'header__checkbox').append(input).append(switcherWrapper).end();

    input.addEventListener('change', this.change.bind(this));

    return checkboxWrapper;
  }
}
