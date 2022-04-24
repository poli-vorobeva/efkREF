export class RegisterFormValidate {

  private validateName(str: string) {
    const regExpName = /[123456789~!@#&$%*()_—+=|:;"'`<>,.?]/gi
    return str.match(regExpName)?.length>0?false:true
  }

  private validateEmail(str: string) {
    const emailPattern = /[^~!@#$%*()_—+=|:;"'`<>,.?]+@[^0123456789~!@#$%*()_—+=|:;"'`<>,.?]+\.[^0123456789~!@#$%*()_—+=|:;\"'`<>,.?]{1,5}/i;
 return str.match(emailPattern)?.length>0?false:true
  }

  private validatePassword(str: string) {
    const regExpPassword = /[123456789~!@#&$%*()_—+=|:;"'`<>,.?]/gi
    return str.match(regExpPassword)?.length>0?false:true
  }

  validate(field: string, value: string) {
    return field === 'name'
      ? this.validateName(value)
      : field === 'email'
        ? this.validateEmail(value)
        : this.validatePassword(value)
  }
}
