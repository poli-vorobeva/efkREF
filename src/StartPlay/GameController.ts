import {StoreType} from '../types';
import {categoriesStorage} from '../storage/imagesStorage';
import {SoundsPlay} from './SoundsPlay/SoundsPlay';
import {FinishScreen} from '../View/FinishScreen/FinishScreen';
import {asyncLocalStorage, playDelay} from '../canstants';

function random(n: number): number {
  return Math.floor(Math.random() * n);
}

export function isCorrect(word: string, audio: string): boolean {
  return word === audio;
}

export interface IPlay {
  init(): void

  trainClick(element: HTMLElement): void

  gameClick(e: Event): boolean

  startGame(button?: HTMLElement): void

  repeatWord(): void

  defaultGame(): { [key: string]: {} }

  currentCategory: string
  mistakes: number
  // getStarsContainer(element:HTMLElement):void
  // isCorrect(word:string, audioWord:string):boolean
}

export class GameController {
  store: StoreType;

  currentCategory: string;

  categoryWords: string[] = [];

  clickedTrianWords: { [key: string]: number };

  clickedGameWords: { [key: string]: number };

  audioWordsArray: string[];

  currentAudioWord: string;

  playStatistic: null;

  parent: HTMLElement;

  starsContainer: null | HTMLElement;

  mistakes: number;
  isStarted: boolean
  onFinishRound: (mistakes: number) => void
  private randomAudio: SoundsPlay;

  constructor(store: StoreType, parent: HTMLElement, wordsArray: string[]) {
    this.store = store;
    this.playStatistic = null;
    this.currentCategory = '';
    this.categoryWords = wordsArray.slice();
    this.clickedTrianWords = {};
    this.clickedGameWords = {};
    this.currentAudioWord = '';
    this.parent = parent;
    this.starsContainer = null;
    this.mistakes = 0;
    this.isStarted = false
    this.audioWordsArray = wordsArray.slice()
  }

  init(): void {
    const state = this.store.getState();
    this.currentCategory = state.category as string;
  }

  trainClick(word: string): void {
    word in this.clickedTrianWords ? this.clickedTrianWords[word] += 1 : this.clickedTrianWords[word] = 1;
  }

  gameClick(word: string): boolean {
    if(!this.isStarted)return
    if (!word) return
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
      const categoryWords = this.defaultGame()
      localStorage.setItem(this.currentCategory, JSON.stringify(categoryWords))
      this.onFinishRound(this.mistakes)
      // this.parent.appendChild(finishScreen(this.mistakes, this.store));
      this.mistakes = 0
    }
    if (isCorrect(word, this.currentAudioWord)) {
      this.startGame();
      return true;
    }
    return false;
  }

  startGame(button?: HTMLElement): void {
    this.isStarted = true
    this.store.subscribe(() => {
      if (this.store.getState().mode === 'train') {
      //  this.isStarted = false
        //this.currentAudioWord = '';
       // this.init()
        this.mistakes = 0
        this.clickedGameWords = {};
        // if (button) {
        //   button.innerText = 'START';
        // }
      }
      // else {
      //   this.isStarted = true
      // }
    })
    if (this.isStarted) {
      const randomWord = random(this.audioWordsArray.length);
      this.randomAudio = new SoundsPlay(this.parent, this.audioWordsArray[randomWord]);
      // this.parent.appendChild(randomAudio);
      setTimeout(() => {
        this.randomAudio.destroy()
      }, playDelay * 5);
      this.currentAudioWord = this.audioWordsArray[randomWord];
      this.audioWordsArray.splice(randomWord, 1);
    }
  }

  defaultGame(): { [key: string]: {} } {
    const categoryWordsObject: { [key: string]: {} } = {}
    const words = this.categoryWords
    for (let i = 0; i < words.length; i++) {
      const wordObject = {
        train: 0,
        game: 0,
        mistakes: 0,
        percent: 0
      }
      wordObject.game = this.clickedGameWords[words[i]]
      wordObject.train = this.clickedTrianWords[words[i]] ? this.clickedTrianWords[words[i]] : 0
      wordObject.mistakes = this.clickedGameWords[words[i]] - 1
      wordObject.percent = Math.floor((1 / this.clickedGameWords[words[i]]) * 100)
      categoryWordsObject[words[i]] = wordObject
    }

    return categoryWordsObject
  }

  repeatWord(): void {
    const repeatAudio = new SoundsPlay(this.parent, this.currentAudioWord);
    setTimeout(() => {
      repeatAudio.destroy()
    }, 1000);
  }

  removeRandomAudio() {
    this.randomAudio.destroy()
  }
}
