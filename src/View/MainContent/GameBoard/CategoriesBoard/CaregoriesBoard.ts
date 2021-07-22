import './CategoriesBoard.scss';
import { f, IHelper } from '../../../../../Util';
import { categoriesStorage } from '../../../../storage/imagesStorage';
import { basePathImages, imagesExtension } from '../../../../canstants';
import {getCategories, getImages} from "../../../../storage/serverRequests";

export interface ICategoriesBoard {
  render ():HTMLElement
}
export async function categoriesCardItem( categoriesTitle:string, word:string):Promise<HTMLElement> {
  const imgBase64= await getImages(word)
 // const img:HTMLElement = f.create('img').attribute('src', `${basePathImages}${path}/${name}${imagesExtension}`).end();
  const imageWrapper:HTMLElement = f.create('div', 'item__image_wrapper').end()
    //.append(img).end();
  const title:HTMLElement = f.create('div', 'item__title_wrapper').html(`<h5>${categoriesTitle}</h5>`).end();
  const cardWrapper:HTMLElement = f.create('div', 'item__wrapper').append(imageWrapper).append(title)
    .end();
  return cardWrapper;
}
async function getI(e){
  const it=await categoriesCardItem(item.title as string, item.images[0])
  return it
}
export async function CategoriesBoard():Promise<HTMLElement> {
  const data= await getCategories()
  const responseJson = await data.json();
  const d:string = JSON.stringify(responseJson);
  const dataObject:{[key:string]:{[key:string]:string|string[]}[]} = JSON.parse(d);
  const mainWrapper:IHelper = f.create('section', 'cards__wrapper');
  const imagesBase64Obj: { [key:string]:string }={}
   const {categories}=dataObject

  categories.forEach(e=>{
   console.log(getI(e))
  })
  // async function forLoop() {
  //   console.log('Start')
  //
  //   for (let index = 0; index < categories.length; index++) {
  //     const item = categories[index]
  //     const r = await categoriesCardItem(item.title as string, item.images[0])
  //     console.log(r)
  //   }
  //
  //   console.log('End')
  // }
  // await forLoop()
  // for (let i=0;i<categories.length;i++){
  //   console.log(categories[i].title as string, categories[i].images[0])
  //   console.log(await categoriesCardItem(categories[i].title as string, categories[i].images[0]))
  // }
  // const all= await Promise.all(
  //   for(let i=0;i<categories.length;i++){
  //      await categoriesCardItem(categories[i].title as string, categories[i].images[0])
  //   }
  // )
  // console.log(all)
  // categories.map(async e=>{
  //   const base=await categoriesCardItem(e.title as string, e.images[0])
  //   obj.e=base
  // })
  console.log('!!!!!!!',obj)
// console.log(categories)
//   async function printFiles () {
//     for await (const contents of categories.map(cat =>categoriesCardItem(cat.title as string, cat.images[0])) {
//       console.log(contents)
//     }
//   }
//   await printFiles()
  //нам надо первую картинку и заголовок

  //
  // const getCategoriesCards = async (categories) => {
  //  // Object.entries(categories).forEach()
  //   return Promise.all(categories.map(async (cat) => {
  //     const item = await categoriesCardItem(cat.title as string, cat.images[0])
  //     console.log(item)
  //     mainWrapper.append(item)
  //   }));
  // };
  // await getCategoriesCards(categories);
  // categories.forEach(cat=>{
  //   console.log(cat.title)
  //   console.log(cat.images[0])
  //
  //   mainWrapper.append(categoriesCardItem(cat.title as string, cat.images[0]))
  // })
     //.forEach((cat:{[key:string]:string|string[]})=>{
  //  // const {title,images}=cat
  //   const base64 : { [key:string]:string } = await getImages(images)
  //   //console.log('********',base64)

   // mainWrapper.append(categoriesCardItem(e[1].title, e[1].images as string));
  //})
  // Object.entries(dataObject.categories).forEach((e) => {
  //  // console.log(e);
  //   (e[1] as Array<any>).forEach(w=>{
  //    // console.log(w.title)
  //    // console.log(w.name,w.title,w.images)
  //     // mainWrapper.append(categoriesCardItem(e[1].name as string, e[1].title, e[1].images as string));
  //   })
  // });
  return mainWrapper.end();
}
