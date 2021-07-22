import './RegisterForm.scss'
import {StoreType} from "../../../types";
import {f} from "../../../../Util";
import {RegisterController} from "../../../Controllers/RegisterController";
export class RegisterForm{
  store:StoreType;
  mode:string
  constructor(store:StoreType){
    this.store=store
    this.mode=''
  }
  render():HTMLElement{
    const formRegisterName=f.create('input').attribute('type','text').attribute('placeholder','YourName').end()
    const formRegisterEmail=f.create('input').attribute('type','email').attribute('placeholder','Email').end()
    const formRegisterPassword=f.create('input').attribute('type','password').attribute('placeholder','Password').end()
    const formRegister=f.create('form','form__register').append(formRegisterName).append(formRegisterEmail).append(formRegisterPassword).end()
    const buttonSubmit=f.create('button','register__submit').text('Ready').end()
    buttonSubmit.addEventListener('click',(e)=>{
      e.preventDefault()
     // console.log((e.target as HTMLElement).closest('form'))
      RegisterController(this.store,this.mode,(e.target as HTMLElement).closest('form') as HTMLElement)
    })
    const form= f.create('form','register__form').append(formRegister).append(buttonSubmit).end()
    const buttonRegister= f.create('button','button__register').text('Register').end()
    buttonRegister.addEventListener('click',()=>{
      this.mode='register'
      formRegisterName.style.opacity='1'
      formRegisterPassword.style.opacity='1'
      formRegisterEmail.style.opacity='1'

    })
    const buttonLogin=f.create('button','button__login').text('LogIn').end()
    buttonLogin.addEventListener('click',()=>{
      this.mode='login'
      formRegisterName.style.opacity='0'
      formRegisterPassword.style.opacity='1'
      formRegisterEmail.style.opacity='1'
    })
    const registerWrapper= f.create('section','register')
      .append(buttonRegister).append(buttonLogin).append(form).end()
    return  registerWrapper
  }
}
