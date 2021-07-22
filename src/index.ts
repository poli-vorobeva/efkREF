import './styles.scss';
import { App } from './View/App';

async function appl(){
  return document.querySelector('body')?.appendChild( await new App().init());
}
appl()
