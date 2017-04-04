class Root {
  constructor() {
    this.labels = {};
  }
}

class Node {
  constructor(data, eow) {
    this.labels = {}
    this.eow = eow || false
    this.data = []
    if (data) this.data.push(data)
  }
}

export default class RadixTree = {
  constructor(){
    this.root = new Root();
  }
  addWord(word,data){
    if (typeof word !== 'string') return new Error('Don\'t be such a sucker')
    this.addNode.prototype.call(this.root, word, data)
  }
  addNode(word, data){
    let labels = Object.keys(this.labels), keyword // this = root
    if (labels.length === 0) return this.labels[word] = word
    word.split('').reduce(function (substring, letter, i) {
      keyword = substring + letter
      if (labels[keyword] && labels[keyword].labels.length === 0){
        // found a match and it doesnt have children. Add new node as a child.
        this.labels[word] = new Node(data, true)
      }
      if (labels[keyword]){
        // found a match and it has children. Add node.
        let wordTail = word.substring(i+1)
      } this.addNode.prototype.call(this.labels[keyword], wordTail, data)
    }, '')


    


  }
  addMany(wordArray, data){
    wordArray.map((word)=>return addWord(word, data))
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