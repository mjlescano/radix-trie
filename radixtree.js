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

export default class RadixTree {
  constructor() {
    this.root = new Root();
  }
  addWord(word, data) {

  }
  addMany(wordArray, data) {
    wordArray.forEach(word => this.addWord(word, data));
  }
  findPartial(word) {
    const node = this.find(word);
    return this.extracNodes(node);
  }

  extractNodes(node) {
    if (!Object.keys(node.labels).length) {
      return node.data;
    }
    return this.concatMap(Object.keys(node.labels), label => this.extractNodes(node.labels[label]));
  }


  search(word, tree) {
    if (this.labels[word]) {
      return this.labels[word];
    }
    for (let i = word.length - 1; i > 0; i -= 0) {
      if (this.labels[word.slice(0, i)]) {
        return tree.search.call(this.labels[word.slice(0, i)], word.slice(i), tree);
      }
    }
    return false;
  }

  find(word) {
    const tree = this;
    return this.search.call(this.root, word, tree);
  }

  findWord(word) {
    const node = this.find(word);
    if (node) {
      return {
        word,
        data: node.data,
      };
    }
    return node;
  }

  removeWord(word, data) {

  }

  update(oldWordArray, newWordArray, data){
    oldWordArray.forEach((oldWord) => {
      removeWord(oldWord, data);
    })
    addMany(newWordArray, data);
  }

  concatMap(arr, fn) {
    const newArr = arr.map(elem => fn(elem));
    const finalArr = [];
    newArr.forEach((nArr) => {
      nArr.forEach(elem => finalArr.push(elem));
    });
    return finalArr;
  }
}
