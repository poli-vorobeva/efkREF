import { starSvg } from '../../canstants';
import { f } from '../../../Util';

export function stars():HTMLElement {
  const star = starSvg;
  const starElement = f.create('span').html(star).end();
  return starElement;
}
