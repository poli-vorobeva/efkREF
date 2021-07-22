import { Reducer } from 'redux';
import { ActionType, StateType } from '../types';
import {AUTH, MODE, OPEN_CAREGORY, OPENADMIN, OPENREGISTER, REDRAW} from './actionTypes';

export interface IInitialState {
  counter: number,
  mode: string,
  category: string,
  startGame: boolean,
  isAuth:boolean
}
export const initialState: IInitialState = {
  counter: 0,
  mode: 'train',
  category: 'start',
  startGame: false,
  isAuth: false,
};

// export function rootReducer(Reducer<IInitialState, Action<any>>): StoreEnhancer<IInitialState, unknown> | undefined) {
// export function rootReducer(state:IInitialState, action:ActionType):IInitialState {
// export function rootReducer(state:IInitialState, action:ActionType):IInitialState {
export const rootReducer: Reducer<IInitialState> = (state = initialState, action) => {
  switch (action.type) {
    case MODE:
      state.mode = action.mode;
      break;
    case OPEN_CAREGORY:
      state.category = action.category;
      break;
    case REDRAW:
      state.category = 'start';
      break;
    case OPENADMIN:
      state.category = 'admin';
      break;
    case OPENREGISTER:
      state.category = 'register';
      break;
    case AUTH:
      state.isAuth = true;
      state.category = 'start';
      break;
    default:
      return state;
  }

  return state;
};
