import './AdminPage.scss'
import {StoreType} from "../../types";
import {AdminCategories} from "./AdminCategories/AdminCategories";
import Control from "../../common/Control";

export class AdminPage extends Control {
  store: StoreType

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', 'adminPage__wrapper')
    const modeButtons = new Control(this.node, 'div', 'modeButtons__wrapper')
    const categoriesMode = new Control(modeButtons.node, 'button', 'button__categories', 'Edit Category')
    const adminContent = new AdminCategories().render()
  }
}
