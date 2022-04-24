import './Statistic.scss';
import { f, IHelper } from '../../../Util';
import {categoriesStorage, superObject, translateImages} from '../../storage/imagesStorage';
import {IPlay} from "../../StartPlay/GameController";
import {StoreType} from "../../types";

// div с категорией->div-title  - div-> data
// data- word/translate- trainClicked - gameMistakes
//

export class Statistic {
  play:IPlay
  tableClass:string
  tabsClass:string
  store:StoreType
  table:HTMLElement
  tabsCategories:HTMLElement
  constructor(play:IPlay,store:StoreType){
    this.play=play
    this.tableClass='statistic__table'
    this.tabsClass='statistic__tabs'
    this.store=store
    this.table= f.create('div', this.tableClass).end();
    this.tabsCategories=f.create('div',this.tabsClass).end()
  }
  findActive(category?:string):void{
    const startCategory='actions1'
    const currentCategory=category?category:this.play.currentCategory?startCategory:'';
    const categorieBlocks = this.table.querySelectorAll(`[data-category]`)
    const tabBlocks= this.tabsCategories.querySelectorAll(`[data-tab ]`)
    categorieBlocks.forEach(cat=>{
     if((cat as HTMLElement).dataset.category===currentCategory){

       (cat as HTMLElement)?.classList.add('statistic__table_active')
     }else{
       (cat as HTMLElement)?.classList.remove('statistic__table_active')
     }
    })
    tabBlocks.forEach(tab=>{
      if((tab as HTMLElement).dataset.tab===currentCategory){
        (tab as HTMLElement)?.classList.add('statistic__tab_active')
      }else{
        (tab as HTMLElement)?.classList.remove('statistic__tab_active')
      }
    })
  }
  render():HTMLElement{
    Object.keys(categoriesStorage).forEach((key) => {
      const tab= f.create('div').attribute('data-tab',key).html(`<p>${key}</p>`).end()
      tab.addEventListener('click',(e)=>{
        const clickedCategory=(e.target as HTMLElement).closest('div')?.dataset.tab
       // console.log(clickedCategory)
        this.findActive(clickedCategory)
      })
      this.tabsCategories.append(tab)
      const categoryWrapper:IHelper = f.create('div', 'statistic__category_wrapper')
        .attribute('data-category',key);
      const categoryWords={...{'':{train: 'train', game: 'game', mistakes: 'mistakes', percent: 'percent'}},...JSON.parse(localStorage.getItem(key) as string)}
     // console.log(categoryWords,'!!!!')
      const wordsWrapper = f.create('div', 'category__words_wrapper')
      Object.keys(categoryWords).forEach((word)=>{
        const {train,game,mistakes,percent}=categoryWords[word]
        const wordWrapper:IHelper=f.create('div','word__wrapper')
        const wordDiv=f.create('div','word').html(`<p>${word}</p>`).end()
        const translateWordDiv= f.create('div','word__translate').html(`<p>${translateImages[word]?translateImages[word]:''}</p>`).end()
        const trainClickedDiv=f.create('div','word__trainClick').html(`<p>${train!=='train'?+train:'Train'}</p>`).end()
        const gameClickedDiv=f.create('div','word__gameClick').html(`<p>${game!=='game'?+game:'Game'}</p>`).end()
        const mistakesDiv=f.create('div','word__mistakes').html(`<p>${mistakes!=='mistakes'?+mistakes:'Mistakes'}</p>`).end()
        const percentDiv=f.create('div','word__percent').html(`<p>${percent!=='percent'?+percent:'Persents'}</p>`).end()
        wordWrapper.append(wordDiv).append(translateWordDiv).append(trainClickedDiv)
          .append(gameClickedDiv).append(mistakesDiv).append(percentDiv)
        wordsWrapper.append(wordWrapper.end())
      })
      this.table.append(categoryWrapper.append(wordsWrapper.end()).end());
    });
    this.findActive();
    const statisticWrapper = f.create('section', 'statistic__wrapper')
      .append(this.tabsCategories).append(this.table).end();
    return statisticWrapper;
  }

}
