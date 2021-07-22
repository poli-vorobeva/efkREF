import {authorization, getCategories} from "../storage/serverRequests";
import {StoreType} from "../types";
import {authorized} from "../redux/actions";

export async function RegisterController(store:StoreType,mode:string,form:HTMLElement) {
console.log(mode)
const name =(form.querySelector('input[type=text]') as HTMLInputElement)?.value
const password =(form.querySelector('input[type=password]') as HTMLInputElement)?.value
const email =(form.querySelector('input[type=email]') as HTMLInputElement)?.value

  //console.log(name,email,password)
  //отправляем запрос
  let userObj={}
  if(mode==='register'){
    userObj={name,password,email}
  }else{
    userObj={password,email}
  }

   const data= await authorization(mode,userObj)
   const responseJson=await data.json()
    localStorage.setItem('token',await responseJson.token)
    if(responseJson.status==='success'){
      store.dispatch(authorized())
      console.log(store.getState())
    }
}
