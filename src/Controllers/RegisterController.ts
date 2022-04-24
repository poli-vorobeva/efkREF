import {authorization, getCategories} from "../storage/serverRequests";
import {StoreType} from "../types";
import {authorized} from "../redux/actions";
import {userRegister} from "../View/MainContent/RegisterForm/RegisterForm";

export async function RegisterController(userObject:userRegister,mode:string) {

  const data= await authorization(mode,userObject)
   const responseJson=await data.json()
    localStorage.setItem('token',await responseJson.token)
    if(responseJson.status==='success'){
      return responseJson
      //store.dispatch(authorized())
      //console.log(store.getState())
    }
    return false
}
