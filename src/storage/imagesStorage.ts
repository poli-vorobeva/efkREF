export type CategoriesStorageType = {
  [ket:string]:{
    [key:string]:string|string[]
  }
};
export type TranslateType = {
  [key:string]:string
};
export const translateImages:TranslateType = {
  ride: 'кататься',
  fishing: 'ловтить рыбу',
  run: 'бегать',
  point: 'указывать',
  sing: 'петь',
  skip: 'прыгать',
  swim: 'плавать',
  fly: 'летать',
  cry: 'плакать',
  dance: 'танцевать',
  dive: 'нырять',
  draw: 'рисовать',
  hug: 'обнимать',
  jump: 'прыгать',
  open: 'открывать',
  play: 'играть',
  dog: 'собака',
  dolphin: 'дельфин',
  lion: 'лев',
  mouse: 'мышь',
  pig: 'свинья',
  rabbit: 'кролик',
  sheep: 'овца',
  turtle: 'черепаха',
  bird: 'птица',
  cat: 'кошка',
  chick: 'цыпленок',
  chicken: 'курица',
  fish: 'рыба',
  frog: 'лягушка',
  giraffe: 'жираф',
  horse: 'лошадь',
  blouse: 'блузка',
  boot: 'ботинки',
  coat: 'пальто',
  dress: 'платье',
  pants: 'штаны',
  shirt: 'рубашка',
  shoe: 'обувь',
  skirt: 'юбка',
  angry: 'злой',
  happy: 'счастье',
  laugh: 'смех',
  sad: 'грусть',
  scared: 'страх',
  smile: 'улыбка',
  surprised: 'удивление',
  tired: 'усталость',
  candy: 'конфеты',
  cheese: 'сыр',
  onion: 'лук',
  porrige: 'каша',
  potato: 'картошка',
  soup: 'суп',
  strawberry: 'клубника',
  tomato: 'помидор',
  apple: 'яблоко',
  banana: 'банан',
  bread: 'хдеб',
  cabbage: 'капуста',
  cucumber: 'огурец',
  egg: 'яйцо',
  juice: 'сок',
  mushroom: 'грибы',
};
export const categoriesStorage:CategoriesStorageType = {
  actions1: {
    path: 'actions1',
    title: 'Actions (set 1)',
    images: ['ride', 'fish', 'run', 'point', 'sing', 'skip', 'swim', 'fly'],
  },
  actions2: {
    path: 'actions2',
    title: 'Actions (set 2)',
    images: ['cry', 'dance', 'dive', 'draw', 'hug', 'jump', 'open', 'play'],
  },
  animals1: {
    path: 'animals1',
    title: 'Animals (set 1)',
    images: ['dog', 'dolphin', 'lion', 'mouse', 'pig', 'rabbit', 'sheep', 'turtle'],
  },
  animals2: {
    path: 'animals2',
    title: 'Animals (set 2)',
    images: ['bird', 'cat', 'chick', 'chicken', 'fish', 'frog', 'giraffe', 'horse'],
  },
  clothes: {
    path: 'clothes',
    title: 'Clothes',
    images: ['blouse', 'boot', 'coat', 'pants', 'dress', 'shirt', 'shoe', 'skirt'],
  },
  emotions: {
    path: 'emotions',
    title: 'Emotions',
    images: ['angry', 'happy', 'laugh', 'sad', 'scared', 'smile', 'surprised', 'tired'],
  },
  food1: {
    path: 'food1',
    title: 'Food (set 1)',
    images: ['candy', 'cheese', 'onion', 'porrige', 'potato', 'soup', 'strawberry', 'tomato'],
  },
  food2: {
    path: 'food2',
    title: 'Food (set 2)',
    images: ['apple', 'banana', 'bread', 'cabbage', 'cucumber', 'egg', 'juice', 'mushroom'],
  },

};
type superType={
  [key:string]:{
    [key:string]:{
      [key:string]:number
    }
  }
}
export let superObject:superType= {}
let category:string=''
//Object.keys(categoriesStorage).forEach(e=>{
  for(let key in categoriesStorage){
    category=key
  const categoryWords:{[key:string]:{}}={}
  for(let i=0;i<categoriesStorage[category].images.length;i++){
   const word= categoriesStorage[category].images[i]
   categoryWords[word]={train:0,game:0,mistakes:0,percent:0}
 }
 // const wordData={}
    //console.log(key as keyof superType,'%%')
    superObject[key as keyof superType]=categoryWords

//console.log(superObject)
  }
