import {AUTH, MODE, OPEN_CAREGORY, OPENADMIN, OPENREGISTER, REDRAW} from './actionTypes';

export function changeMode(mode:string) {
  return {
    type: MODE,
    mode,
  };
}
export function openCategory(category:string) {
  return {
    type: OPEN_CAREGORY,
    category,
  };
}
export function redraw() {
  return {
    type: REDRAW,
  };
}
export function openAdmin() {
  return {
    type: OPENADMIN,
  };
}
export function openRegister() {
  return {
    type: OPENREGISTER,
  };
}
export function authorized() {
  return {
    type: AUTH
  };
}
