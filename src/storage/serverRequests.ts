
const BASE_URL='https://englishserver.herokuapp.com/'

export async function getCategories (){
  const res= await fetch(BASE_URL+'api/categories',{
    method: 'GET',
    headers:{
      'Access-Control-Allow-Origin':'*',
    }
  })
  return res
}
export async function authorization(registerMode:string,userObj:{[key:string]:string}):Promise<any>{
  const response = await fetch(BASE_URL+`api/users/${registerMode==='register'?'signup':'login'}`,{
    method: 'POST',
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Content-Type':  'application/json'
    },
    body: JSON.stringify(userObj)
  })
return response
};

export async function createCategory(userObj:{[key:string]:string|string[]}):Promise<any>{
  console.log('^^',userObj)
  const response = await fetch(BASE_URL+`api/categories`,{
    method: 'POST',
    headers:{
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type':  'application/json'
    },
    body: JSON.stringify(userObj)
  })
 console.log('CReate',await response)

  return response
};
export async function addTranslate(translObj:{[key:string]:string}):Promise<any>{
  const response = await fetch(BASE_URL+`api/translates`,{
    method: 'POST',
    headers:{
      'Content-Type':  'application/json'
    },
    body: JSON.stringify(translObj)
  })
  console.log('CReateTranslate',await response)
  return response
}
export async function getTranslate(word:{[key:string]:string}):Promise<any>{
  const response = await fetch(BASE_URL+`api/translate`,{
    method: 'GET',
    headers:{
      'Content-Type':  'application/json'
    },
    body: JSON.stringify(word)
  })
  console.log('GetTrans',await response)
  return response
}

export async function addImages(image:{[key:string]:string}):Promise<any>{

  const response = await fetch(BASE_URL+`api/images`,{
    method: 'POST',
    headers:{
      'Content-Type':  'application/json'
    },
    body: JSON.stringify(image)
  })
    console.log('CReateImage',await response.json())
  return response
}
export async function getImages(word:string) {
  console.log('!11111',word)
  const response = await fetch(BASE_URL+`api/images/${word}`,{
    method: 'GET',
    headers:{
      'Access-Control-Allow-Origin':'*',
      'Content-Type':  'application/json'
    }},
    );
  //console.log('GetImage',await response.json())
  return response.json()
}
//export async function addImages(image:{[key:string]:string}):Promise<any>{
//   const response = await fetch(BASE_URL+`api/images`,{
//     method: 'POST',
//     headers:{
//       'Content-Type':  'application/json'
//     },
//     body: JSON.stringify(image)
//   })
//   console.log('CReateImage',await response)
//   return response
// }
