import './FinishScreen.scss';
import { f } from '../../../Util';
import { SoundsPlay } from '../../StartPlay/SoundsPlay/SoundsPlay';
import { StoreType } from '../../types';
import { changeMode, redraw } from '../../redux/actions';

export function finishScreen(mistakes:number, store:StoreType):HTMLElement {
  const finishScreenWrapper:HTMLElement = f.create('div', 'finishScreen__wrapper').end();

  const sound = SoundsPlay(mistakes === 0 ? 'success' : 'failure');
  const mistakesTitle= f.create('h4','finishScreen__title').text(`Сделано ${mistakes} ошибки(а)`).end()
  const smileImage = f.create('img').attribute('src',
    `./assets/img/${mistakes === 0 ? 'success' : 'failure'}.jpg`).end();
  const smileElement = f.create('span', 'finishScreen__smile').append(smileImage).append(mistakesTitle).end();
  finishScreenWrapper.appendChild(sound);
  finishScreenWrapper.appendChild(smileElement);
  setTimeout(() => {
    finishScreenWrapper.removeChild(sound);
    store.dispatch(redraw());
    finishScreenWrapper.parentElement?.removeChild(finishScreenWrapper);
  }, 2000);
  return finishScreenWrapper;
}
