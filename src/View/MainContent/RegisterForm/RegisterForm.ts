import './RegisterForm.scss'
import {StoreType} from "../../../types";
import {f} from "../../../../Util";
import {RegisterController} from "../../../Controllers/RegisterController";
import Control from "../../../common/Control";
import {RegisterFormValidate} from "./RegisterFormValidate";

export class RegisterForm extends Control {
  store: StoreType;
  mode: string
  private formRegisterName: Control<HTMLInputElement>;
  private formRegisterEmail: Control<HTMLInputElement>;
  private formRegisterPassword: Control<HTMLInputElement>;
  private name: string;
  private password: string;
  private email: string;
  private buttonSubmit: Control<HTMLElement>;
  private formValidate: RegisterFormValidate;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', 'register')
    //this.store=store
    this.mode = ''
    this.name = ''
    this.password = ''
    this.email = ''
    const wrapper= new Control(this.node,'div','registerWrapper')
    const buttonRegister = new Control(wrapper.node, 'button', 'button__register', 'Register')
    buttonRegister.node.onclick = () => this.registerMode('register')

    const buttonLogin = new Control(wrapper.node, 'button', 'button__login', 'LogIn')
    buttonLogin.node.onclick = () => this.registerMode('login')
    this.formValidate = new RegisterFormValidate()
    const form = new Control(wrapper.node, 'form', 'register__form')
    const formRegister = new Control(form.node, 'form', 'form__register')
    this.formRegisterName = new Control(formRegister.node, 'input')
    this.formRegisterName.node.setAttribute('type', 'text')
    this.formRegisterName.node.oninput = (e) => {
      this.name = (e.target as HTMLInputElement).value
      this.submitButtonView()
      console.log(this.formValidate.validate('name',this.name))
    }
    this.formRegisterName.node.setAttribute('placeholder', 'YourName')
    this.formRegisterEmail = new Control(formRegister.node, 'input')
    this.formRegisterEmail.node.setAttribute('type', 'email')
    this.formRegisterEmail.node.setAttribute('placeholder', 'Email')
    this.formRegisterEmail.node.oninput = (e) => {
      this.email = (e.target as HTMLInputElement).value
      this.submitButtonView()
      console.log(this.formValidate.validate('email',this.email))
    }
    this.formRegisterPassword = new Control(formRegister.node, 'input')
    this.formRegisterPassword.node.setAttribute('type', 'password')
    this.formRegisterPassword.node.setAttribute('placeholder', 'Password')
    this.formRegisterPassword.node.oninput = (e) => {
      this.password = (e.target as HTMLInputElement).value
      this.submitButtonView()
      console.log(this.formValidate.validate('password',this.password))
    }
    this.buttonSubmit = new Control(form.node, 'button', 'register__submit', 'Ready')
    this.buttonSubmit.node.addEventListener('click', (e) => {
      e.preventDefault()
      // console.log((e.target as HTMLElement).closest('form'))
      //RegisterController(this.store,this.mode,(e.target as HTMLElement).closest('form') as HTMLElement)
    })
    const closeBtn = new Control(form.node, 'span', 'register-close', 'x')
  }

  registerMode(mode: string) {
    this.mode = mode
    this.formRegisterName.node.style.opacity = mode === 'login' ? '0' : '1'
    this.formRegisterPassword.node.style.opacity = '1'
    this.formRegisterEmail.node.style.opacity = '1'
  }

  submitButtonView() {
    if ((this.mode === 'register' && this.password && this.email && this.name) || (this.password && this.email)) {
      this.buttonSubmit.node.style.display = 'block'
    } else {
      this.buttonSubmit.node.style.display = 'none'
    }
  }
}
