import { IPlay } from './StartPlay/Play';

export interface IHeader {
  render():HTMLElement
}
export interface IApp {
  render():Promise<HTMLElement>;
  init():Promise<HTMLElement>;
  play:IPlay
}
