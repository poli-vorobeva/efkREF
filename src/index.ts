import './styles.scss';
import { App } from './View/App';
import Control from "./common/Control";
import {getCategories, getImages} from "./storage/serverRequests";


type categoryListResponse={
  images: string[];
    id: string;
    name: string;
    title: string;
}
type IResponse={categories:categoryListResponse[]}

const preload=async ()=>{
  const cats = await getCategories()
  const categoryResponse:IResponse=await cats.json()
  console.log('###',categoryResponse)
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
