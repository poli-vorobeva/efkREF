export type StateType = { [key: string]: string | number };
export type ActionType = { [key: string]: string; };
export type StoreType = {
  dispatch(action:{ [key:string]:string|number }):void,
  subscribe(callback:()=>void):void,
  getState():StateType
};
