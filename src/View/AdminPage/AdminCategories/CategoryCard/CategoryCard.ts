import './CategoryCard.scss'
import {f} from "../../../../../Util";
import {CategoriesStorageType, translateImages} from "../../../../storage/imagesStorage";
import {basePathImages, imagesExtension} from "../../../../canstants";
import {defaultImg} from "../../../../defaultImg";

export function downloadImg(e:Event,parent:HTMLElement){
console.log('$$$',parent)
    const fl: FileList | null = (<HTMLInputElement>e.target).files;
    if (fl) {
      const file: Blob = fl[0];
      const reader = new FileReader();
      let src: string | ArrayBuffer | null
      reader.onload = () => {
       src= reader.result;
       //console.log('!!!!!-----',src)
        //const img= f.create('img').attribute('src',src as string).end();
        //parent.appendChild(img)
        //console.log('%%',src);
        //parent.innerText=''
        parent.setAttribute('src',src as string) ;
       console.log(parent)
        console.log(src)
        //return src
      };
      reader.readAsDataURL(file);
    }
}

export function createWordCeil(i:string,transl?:string,image?:string) {

  const word = f.create('span', 'word').attribute('contenteditable', 'true').text(i).end()
  const translate = f.create('span', 'translate').attribute('contenteditable', 'true').text(transl?transl:translateImages[i]).end()
  const inputImage = f.create('input', 'loadImg__input').attribute('type', 'file').end()
  const img:HTMLElement=f.create('img','ceil__img').end()

img.setAttribute('src',image || defaultImg)
console.log(image)
  inputImage.addEventListener('change', async (e) => {
    console.log('CHANG')
    const newImg=f.create('img','ceil__img').end();
    const r = await downloadImg(e,newImg as HTMLImageElement);
    console.log(await newImg)
    console.log('%%%',await r);
      (e.target as HTMLInputElement).value = '';
    (e.target as HTMLInputElement).closest('.loadImg')
      ?.removeChild((e.target as HTMLInputElement).closest('.loadImg')?.querySelector('img') as HTMLElement);
    ((e.target as HTMLInputElement).closest('.loadImg') as HTMLElement)
      ?.insertAdjacentElement('afterbegin',newImg)
 })
  const inputWrapper = f.create('span', 'loadImg').append(img).append(inputImage).end();
  const audio = f.create('button').text('Play').end();

    const li = f.create('li','create__category_wordCeil').append(word).append(translate).append(inputWrapper).append(audio).end()
  return li
  }
export class CategoryCard {
  file: string

  constructor() {
    this.file = '';
  }

  render(category: string, categoryData: { [key: string]: string | string[]; }): HTMLElement {
    const {images} = categoryData
    const title = f.create('h5').text(categoryData.title as string).end()
    const img = f.create('img').attribute('src', `${basePathImages}${category}/${images[0]}${imagesExtension}`).end()
    const caregoryLength = f.create('p').text(`Всего ${images.length} слов в катерогии`).end()
    const list = f.create('ul', 'editMode__words').end()
    const categoryInfo = f.create('div', 'category__card__info').append(title).append(img).append(caregoryLength).end();
//editMode
    (images as string[]).forEach(i => {
      const li=createWordCeil(i)

      list.appendChild(li)
    })


    const editMode = f.create('div', 'category__card__editMode').append(list).end()
    const apdateButton = f.create('button', 'category__card__button-apdate').text('Apdate Category').end()
    const deleteButton = f.create('button', 'category__card__button-delete').text('Delete Category').end()
    const editButton = f.create('button', 'category__card__button-edit').text('Edit Category').end()
    editButton.addEventListener('click', () => {
      categoryInfo.style.display = 'none'
      editMode.style.display = 'block'
    })
    apdateButton.addEventListener('click', () => {
      categoryInfo.style.display = 'block'
      editMode.style.display = 'none'
    })
    const addWordButton = f.create('button', 'category__card__button-addWord').text('Add Word').end()
    const buttonsWrapper = f.create('div', 'cardCategory__buttons_wrapper').attribute('data-categoryCard', categoryData.title as string)
      .append(apdateButton).append(deleteButton).append(editButton).append(addWordButton).end()
    const cardCategoryWrapper = f.create('div', 'cardCategory__wrapper').append(categoryInfo).append(editMode).append(buttonsWrapper).end()
    return cardCategoryWrapper
  }
}

