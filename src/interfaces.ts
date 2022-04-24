import { IPlay } from './StartPlay/GameController';


export interface IApp {
  render():Promise<HTMLElement>;
 // init():Promise<HTMLElement>;
  play:IPlay
}
