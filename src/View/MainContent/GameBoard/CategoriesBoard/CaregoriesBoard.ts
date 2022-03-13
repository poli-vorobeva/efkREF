import './CategoriesBoard.scss';
import {f, IHelper} from '../../../../../Util';
import {categoriesStorage} from '../../../../storage/imagesStorage';
import {basePathImages, imagesExtension} from '../../../../canstants';
import {getCategories, getImages} from "../../../../storage/serverRequests";
import {Categories, PreloadData} from "../../../App";
import Control from '../../../../common/Control';

export interface ICategoriesBoard {
  render(): HTMLElement
}

export class CategoriesCardItem extends Control {
  onClickCategory: () => void

  constructor(parentNode: HTMLElement, categoriesTitle: string, imgBase64: string) {
    super(parentNode)
    const cardWrapper = new Control(this.node, 'div', 'item__wrapper')
    const imageWrapper = new Control(cardWrapper.node, 'div', 'item__image_wrapper')
    const img = new Control(imageWrapper.node, 'img')
    img.node.setAttribute('src', imgBase64)
    const title = new Control(cardWrapper.node, 'div', 'item__title_wrapper')
    const tilteContent = new Control(title.node, 'h5', '', categoriesTitle)
    this.node.onclick = () => {
      console.log(this)
      this.onClickCategory()
    }
  }
}

export class CategoriesBoard extends Control {
  onClick: (name: string) => void

  constructor(parentNode: HTMLElement, preloadData: PreloadData) {
    super(parentNode, 'section', 'cards__wrapper')
    for (let index = 0; index < preloadData.categories.length; index++) {
      const item = preloadData.categories[index]
      const r = new CategoriesCardItem(this.node, item.title, preloadData.images[index].img?.base64)
      r.onClickCategory = () => {
        this.onClick(item.name)
      }
    }
  }
}
