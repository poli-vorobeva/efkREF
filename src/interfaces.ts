import { IPlay } from './StartPlay/Play';


export interface IApp {
  render():Promise<HTMLElement>;
 // init():Promise<HTMLElement>;
  play:IPlay
}
