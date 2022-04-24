import './RegisterForm.scss'
import {StoreType} from "../../../types";
import {f} from "../../../../Util";
import {RegisterController} from "../../../Controllers/RegisterController";
import Control from "../../../common/Control";
import {RegisterFormValidate} from "./RegisterFormValidate";

export type userRegister = { name: string, password: string, email: string }

export class RegisterForm extends Control {
  store: StoreType;
  mode: string
  private formRegisterName: Control<HTMLInputElement>;
  private formRegisterEmail: Control<HTMLInputElement>;
  private formRegisterPassword: Control<HTMLInputElement>;
  private buttonSubmit: Control<HTMLElement>;
  private formValidate: RegisterFormValidate;
  private isValid: boolean[];
  private alertDiv: Control<HTMLElement>;
  private userObject: userRegister;
  onShowAdminButton:()=>void;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', 'register')
    //this.store=store
    this.mode = ''
    this.userObject = {
      name: '',
      password: '',
      email: ''
    }
    const wrapper = new Control(this.node, 'div', 'registerWrapper')
    const buttonRegister = new Control(wrapper.node, 'button', 'button__register', 'Register')
    buttonRegister.node.onclick = () => this.registerMode('register')

    const buttonLogin = new Control(wrapper.node, 'button', 'button__login', 'LogIn')
    buttonLogin.node.onclick = () => this.registerMode('login')
    this.formValidate = new RegisterFormValidate()
    const form = new Control(wrapper.node, 'form', 'register__form')
    form.node.setAttribute('autocomplete', "off")
    const formRegister = new Control(form.node, 'form', 'form__register')
    this.formRegisterName = new Control(formRegister.node, 'input')
    this.inputAttributes(this.formRegisterName.node,{type: 'text',placeholder: 'YourName'})
    this.formRegisterName.node.oninput = (e) => {
      this.onInput('name', this.userObject.name, e.target as HTMLInputElement)
    }
    this.formRegisterEmail = new Control(formRegister.node, 'input')
    this.inputAttributes(this.formRegisterEmail.node, {type: 'email', autocomplete: "false", placeholder: 'Email'})
    this.formRegisterEmail.node.oninput = (e) => {
      this.onInput('email', this.userObject.email, e.target as HTMLInputElement)
    }
    this.formRegisterPassword = new Control(formRegister.node, 'input')
    this.inputAttributes(this.formRegisterPassword.node,{type: 'password',placeholder: 'Password'})
    this.formRegisterPassword.node.oninput = (e) => {
      this.onInput('password', this.userObject.password, e.target as HTMLInputElement)
    }
    this.buttonSubmit = new Control(form.node, 'button', 'register__submit', 'Ready')
    this.buttonSubmit.node.addEventListener('click', (e) => {
      e.preventDefault()
      const authData = RegisterController(this.userObject, this.mode)
      authData
        .then((d) => {
          this.destroy()
          this.onShowAdminButton()
          console.log("****", d.data)})
        .catch((er) => console.log("ERRRR", er))
       // .finally(() => console.log("Fin"))
    })
    const closeBtn = new Control(form.node, 'span', 'register-close', 'x')
    closeBtn.node.onclick = () => this.destroy()
  }

  registerMode(mode: string) {
    this.mode = mode
    this.formRegisterName.node.style.opacity = mode === 'login' ? '0' : '1'
    this.formRegisterPassword.node.style.opacity = '1'
    this.formRegisterEmail.node.style.opacity = '1'
  }

  submitButtonView() {
   if ((this.mode === 'register' && this.userObject.password && this.userObject.email && this.userObject.name)
      || (this.userObject.password && this.userObject.email)) {
      this.buttonSubmit.node.style.display = 'block'
    } else {
      this.buttonSubmit.node.style.display = 'none'
    }
  }

  private onInput(field: string, value: string, ev: HTMLInputElement) {
    this.userObject[field as keyof userRegister] = ev.value
    this.submitButtonView()
    this.validateOnInput(field, value)
  }

  private validateOnInput(field: string, value: string) {
    if (!this.formValidate.validate(field, value)) {
      if(this.alertDiv)return
      this.alertDiv = new Control(this.node, 'div', 'registerAlert', 'NOOOOOOOOO')
    } else {
      this.alertDiv?.destroy()
    }
  }

  private inputAttributes(input: HTMLInputElement, param: Record<string, string>) {
    Object.entries(param).forEach(par => {
      input.setAttribute(par[0], par[1])
    })
  }
}
