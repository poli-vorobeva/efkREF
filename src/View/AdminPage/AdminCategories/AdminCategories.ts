import './AdminCategories.scss'
import {f} from "../../../../Util";
import {categoriesStorage} from "../../../storage/imagesStorage";
import {CategoryCard} from "./CategoryCard/CategoryCard";
import {CreateCategory} from "./CategoryCard/CreateCategory/CreateCategory";

export class AdminCategories{
  render(){
    const createCategory= new CreateCategory().render()
    const adminCategoriesWrapper=f.create('div','admin__categories').append(createCategory).end()

    Object.entries(categoriesStorage).forEach(category=>{
      const cat = new CategoryCard().render(category[0],category[1])
      adminCategoriesWrapper.appendChild(cat)
    })
    return adminCategoriesWrapper
  }
}
