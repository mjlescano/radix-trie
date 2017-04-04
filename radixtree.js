class Root {
  constructor() {
    this.labels = {};
  }
}

class Node {
  constructor() {
    this.labels = {};
    this.data = [];
    this.eow = false;
  }
}

export default class RadixTree = {
  constructor(){
    this.root = new Root();
  }
  addWord(word, data){
    if(typeof word !== 'string') return new Error('dont be such a sucker');
  }
  addMany(wordArray, data){

  }
  findPartial(word){

  }

  findWord(word){

  }

  removeWord(word, data){

  }

  update(oldWordArray, newWordArray, data){
    oldWordArray.forEach((oldWord) => {
      removeWord(oldWord, data);
    })
    addMany(newWordArray, data);
  }
}