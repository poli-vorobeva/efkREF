export interface IHelper{
  attribute(name: string, value: string):this
  html(html: string):this
  append(child: HTMLElement | null | string | undefined):this
  text(txt: string):this
  end():HTMLElement
}
export class HelperUtil implements IHelper {
  el: HTMLElement | null;
  constructor(selector: HTMLElement | string) {
    this.el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }
  attribute(name: string, value: string):this {
    if (name && value) {
      this.el?.setAttribute(name, value);
    } else if (name && !value) {
      this.el?.getAttribute(name);
    }
    return this
  }
  html(html: string):this{
    if(this.el){
      this.el.innerHTML=html
    }
    return this
  };
  append(child: HTMLElement | null | string | undefined):this {
    this.el?.appendChild(child as Node);
    return this;
  }
  text(txt: string):this {
    if (this.el) {
      this.el.textContent = txt;
      return this
    }
    return this;
  }
  end():HTMLElement {
    return this.el as HTMLElement;
  }
}

export function f(selector: HTMLElement | string) {
  return new HelperUtil(selector as HTMLElement);
}

f.create = (tag: string, clss: string | string[] = ''): HelperUtil => {
  const el: HTMLElement = document.createElement(tag);
  if (clss && typeof clss === 'string') {
    el.classList.add(clss);
  } else if (clss && Array.isArray(clss)) {
    clss.forEach((e) => el.classList.add(e));
  }
  return f(el);
};
f.in = (tag: HTMLElement) => f(tag);
