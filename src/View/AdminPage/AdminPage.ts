import './AdminPage.scss'
import {f} from "../../../Util";
import {StoreType} from "../../types";
import {AdminCategories} from "./AdminCategories/AdminCategories";

export class AdminPage{
  store:StoreType
constructor(store:StoreType) {
  this.store=store
}
  render():HTMLElement{
    const categoriesMode=f.create('button','button__categories').text('Edit Category').end()
    const modeButtons = f.create('div','modeButtons__wrapper').append(categoriesMode).end()
    const adminContent=new AdminCategories().render()
    const adminPageWrapper= f.create('section','adminPage__wrapper').append(modeButtons).append(adminContent).end()
    return adminPageWrapper
  }
}
