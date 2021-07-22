import { f } from '../../../Util';

export function SoundsPlay(option:string):HTMLElement {
  const audio = f.create('audio')
    .attribute('src', `./assets/audio/${option}.mp3`).attribute('autoplay', 'true').end();
  return audio;
}
