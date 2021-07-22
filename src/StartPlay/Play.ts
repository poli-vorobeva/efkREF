import { StoreType } from '../types';
import { categoriesStorage } from '../storage/imagesStorage';
import { SoundsPlay } from './SoundsPlay/SoundsPlay';
import { finishScreen } from '../View/FinishScreen/FinishScreen';
import {asyncLocalStorage, playDelay} from '../canstants';

function random(n:number):number {
  return Math.floor(Math.random() * n);
}
export function isCorrect(word:string, audio:string):boolean {
  return word === audio;
}
export interface IPlay{
  init():void
  trainClick(element:HTMLElement):void
  gameClick(e:Event):boolean
  startGame(button?:HTMLElement):void
  repeatWord():void
  defaultGame():{[key:string]: { }}
  currentCategory:string
  mistakes:number
  // getStarsContainer(element:HTMLElement):void
  // isCorrect(word:string, audioWord:string):boolean
}

export class Play implements IPlay {
  store:StoreType;

  currentCategory:string;

  categoryWords:string[] = [];

  clickedTrianWords:{ [key:string]:number };

  clickedGameWords:{ [key:string]:number };

  audioWordsArray:string[];

  currentAudioWord:string;

  playStatistic:null;

  parent:HTMLElement;

  starsContainer:null|HTMLElement;

  mistakes:number;
  isStarted:boolean
  constructor(store:StoreType, parentElement:HTMLElement) {
    this.store = store;
    this.playStatistic = null;
    this.currentCategory = '';
    this.categoryWords = [];
    this.clickedTrianWords = {};
    this.clickedGameWords = {};
    this.audioWordsArray = [];
    this.currentAudioWord = '';
    this.parent = parentElement;
    this.starsContainer = null;
    this.mistakes = 0;
    this.isStarted=false
  }

  init():void {
    const state = this.store.getState();
    this.currentCategory = state.category as string;
    this.audioWordsArray = (categoriesStorage[this.currentCategory].images).slice() as string[];
    this.categoryWords = categoriesStorage[this.currentCategory].images as string[];
  }

  trainClick(element:HTMLElement):void {
    //console.log('##',element)
    const word = (element.querySelector('.card__back-bg') as HTMLElement)?.dataset.word as string;
    if (word in this.clickedTrianWords) {
      this.clickedTrianWords[word]++;
    } else {
      this.clickedTrianWords[word] = 1;
    }
  }
  startGame(button?:HTMLElement):void {
    this.isStarted=true
    this.store.subscribe(()=>{
      if(this.store.getState().mode==='train'){
        this.isStarted=false
        this.currentAudioWord = '';
        this.init()
        this.mistakes=0
        this.clickedGameWords={};
        if(button){
          button.innerText='START';
        }
      }else{
        this.isStarted=true
      }
    })
    if(this.isStarted){
      const randomWord = random(this.audioWordsArray.length);
      const randomAudio = SoundsPlay(this.audioWordsArray[randomWord]);
      this.parent.appendChild(randomAudio);
      setTimeout(() => { this.parent.removeChild(randomAudio); }, playDelay);
      this.currentAudioWord = this.audioWordsArray[randomWord];
      this.audioWordsArray.splice(randomWord, 1);
    }
  }

  gameClick(e:Event):boolean {
    const word = (e.target as HTMLElement)?.dataset.word as string;
    if (!isCorrect(word, this.currentAudioWord)) {
      this.mistakes += 1;
      if (this.currentAudioWord in this.clickedGameWords) {
        this.clickedGameWords[this.currentAudioWord]++;
      } else {
        this.clickedGameWords[this.currentAudioWord] = 1;
      }
    } else if (word in this.clickedGameWords) {
      this.clickedGameWords[word]++;
    } else {
      this.clickedGameWords[word] = 1;
    }
    if (this.audioWordsArray.length === 0) {
      const categoryWords=this.defaultGame()
      localStorage.setItem(this.currentCategory,JSON.stringify(categoryWords))
      this.parent.appendChild(finishScreen(this.mistakes, this.store));
      this.mistakes=0
    }
    if (isCorrect(word, this.currentAudioWord)) {
      this.startGame();
      return true;
    }
    return false;
  }
defaultGame():{[key:string]: { }}{
  const categoryWordsObject:{[key:string]:{}}={}
  const words=categoriesStorage[this.currentCategory].images
  for(let i=0;i<words.length;i++){
    const wordObject={
      train: 0,
      game: 0,
      mistakes: 0,
      percent: 0
    }
    wordObject.game=this.clickedGameWords[words[i]]
    wordObject.train=this.clickedTrianWords[words[i]]?this.clickedTrianWords[words[i]]:0
    wordObject.mistakes=this.clickedGameWords[words[i]]-1
    wordObject.percent=Math.floor((1/this.clickedGameWords[words[i]])*100)
    categoryWordsObject[words[i]]=wordObject
  }

  return categoryWordsObject
}
  repeatWord():void {
    const repeatAudio = SoundsPlay(this.currentAudioWord);
    this.parent.appendChild(repeatAudio);
    setTimeout(() => { this.parent.removeChild(repeatAudio); }, 1000);
  }
}
