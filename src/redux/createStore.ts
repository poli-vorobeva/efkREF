import { ActionType, StateType, StoreType } from '../types';

export function createStore(rootReducer:(state:StateType, action: ActionType) => {}, initialState:StateType):StoreType {
  let state = rootReducer(initialState, { type: '__INIT__' });
  const subscribers:any[] = [];
  return {
    dispatch(action:{}) {
      state = rootReducer(state, action);
      subscribers.forEach((sub) => {
        sub();
      // subscribers=[]
      });
    },
    subscribe(callback:()=>void) {
      subscribers.push(callback);
      console.log(subscribers)
    },
    getState(): StateType {
      return state;
    },
  };
}
