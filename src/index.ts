import './styles.scss';
import { App } from './View/App';
import Control from "./common/Control";
import {getCategories, getImages} from "./storage/serverRequests";



const preload=async ()=>{
  const cats = await getCategories()
  const categoryResponse=await cats.json()
  const firstImages = await categoryResponse.categories.map((e)=>e.images[0])
  async function asBase(item:string) {
    return await getImages(item);
  }
  const proms=async function processArray(array:string[]) {
    const promises = array.map(asBase);
     return await Promise.all(promises);
  }
  const imgsBase64 = await proms(firstImages)
  return {...categoryResponse,images:imgsBase64}
}
preload().then((d)=>{
   const app= new App(document.querySelector('body') as HTMLElement)
  app.render(d)
})

// async function appl(){
//   console.log("TTTYYY")
//   return document.querySelector('body')?.appendChild( await new App().init());
// }
// appl()
