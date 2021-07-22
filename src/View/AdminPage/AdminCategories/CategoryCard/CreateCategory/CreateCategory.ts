import './CreateCategory.scss'
import {f} from "../../../../../../Util";
import {createWordCeil, downloadImg} from "../CategoryCard";
import {addImages, addTranslate, createCategory} from "../../../../../storage/serverRequests";

export class CreateCategory{
  textPattern:string
  titlePattern:string
  categoryPattern:string
  translatePattern:string
  constructor(){
    this.textPattern = '[\d\w]';
    this.categoryPattern='\w';
    this.titlePattern ='[\d\s()\w-]';
    this.translatePattern='[a-я]'
  }
  render():HTMLElement{
    const createTitle= f.create('h5','create-category__title').text('Create Category').end()
    const inputName= f.create('input','create-category__name')
      .attribute('type','text').attribute('placeholder','Name of category')
      .attribute('pattern',`{2,20}`).attribute('required', 'true').end()
    const inputTitle=f.create('input','create-category__title')
      .attribute('type','text').attribute('placeholder','Title of category')
      .attribute('pattern',`{3,20}`).attribute('required', 'true').end()
    const wordEnglish=f.create('input','create-category__word-english')
      .attribute('type','text').attribute('placeholder','Enter word')
      .attribute('pattern',`{1,15}`).attribute('required', 'true').end()
    const wordTranslate=f.create('input','create-category__word-translate')
      .attribute('type','text').attribute('placeholder','Enter translate')
      .attribute('pattern',`{1,20}`).attribute('required', 'true').end()
    const inputImage = f.create('input', 'create__loadImg__input').attribute('type', 'file').end()
    const imageBaseWrapper=f.create('img','imageBase64').end()
    inputImage.addEventListener('change', async (e) => {
      await downloadImg(e,imageBaseWrapper as HTMLElement)
    })
    const subformSubmit=f.create('button','subForm__submit').text('Create Word').end()
    const listOfWords = f.create('ul').end()

    subformSubmit.addEventListener('click',(e:Event)=>{
      e.preventDefault()
      if(!(wordEnglish as HTMLInputElement).value || !(wordTranslate as HTMLInputElement).value){
        return
      }
      console.log((e.target as HTMLInputElement).validity)

      const createCeil = createWordCeil(
        (wordEnglish as HTMLInputElement).value,
        (wordTranslate as HTMLInputElement).value,
        imageBaseWrapper.getAttribute('src') as string)

        listOfWords.appendChild(createCeil);
        (wordEnglish as HTMLInputElement).value='';
        (wordTranslate as HTMLInputElement).value='';
    });
    //сабмитим --------------------
    const subform=f.create('form','subForm').append(wordEnglish).append(wordTranslate).append(inputImage).append(subformSubmit).end()
    const formSubmitButton=f.create('button','createCategory__formSubmit').text('Create Category').end()

    const form= f.create('form').append(inputName).append(inputTitle).append(subform).append(listOfWords).append(formSubmitButton).end()
    form.addEventListener('submit',async (e)=>{
      e.preventDefault()
      const category=(inputName as HTMLInputElement).value
      const title=  (inputTitle as HTMLInputElement).value
      const images: {[key:string]:string}[]=[]
      const translateObj:{[key:string]:string}[]=[]
      const imagesObj:{[key:string]:string}[]=[]
      const words=(e.target as HTMLElement).querySelectorAll('li')

      words.forEach(word=>{
        const wordEn=(word.childNodes[0] as HTMLElement).innerText;
        const translate=(word.childNodes[1] as HTMLElement).innerText;
        const loadImgSrc=(word.childNodes[2] as HTMLElement).querySelector('img')?.src;
        //console.log(wordEn,translate,loadImgSrc,imagesObj)
        //images.push({word:wordEn,base64:loadImgSrc})

        translateObj.push({word:wordEn,translate:translate})
        imagesObj.push({word:wordEn as string,base64:loadImgSrc as string})
      })
    //  console.log(translateObj,imagesObj)
      const imgsArr:string[]=[]
      imagesObj.forEach(e=>{
        imgsArr.push(e.word)
      })
     await createCategory({name: category as string,title,images: imgsArr})
      translateObj.forEach(t=>{
        addTranslate(t)
      })
      imagesObj.forEach(i=>{
        console.log(i)
        addImages(i)
      });
console.log('Eyerreerewe');
    })
    const createForm= f.create('div','create-category__form_wrapper').append(form).end()
    const createCategoryWrapper = f.create('section','create-category')
      .append(createTitle).append(createForm).end()
    return createCategoryWrapper
  }
}
