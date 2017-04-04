const isEmpty = require('./utils.js').isEmpty;
const longestCommonPrefix = require('./utils.js').longestCommonPrefix;
const getDifference = require('./utils.js').getDifference;

class Root {
  constructor() {
    this.labels = {};
  }
}

class Node {
  constructor(eow) {
    this.labels = {};
    this.eow = eow || false;
    this.data = [];
  }
  addData(data) {
    this.data.push(data);
    return this;
  }
}


export default class RadixTree {
  constructor() {
    this.root = new Root();
  }
  addWord(word, data, node) {
    if (typeof word !== 'string') return new Error('dont be such a sucker');
    if (!node) {
      node = this.root;
    }

    if (isEmpty(node.labels)) {
      node.labels[word] = new Node(true, node).addData(data);
      return this;
    }

    if (node.labels[word]) {
      node.labels[word].addData(data);
      return this;
    }

    // Get Longest Common Prefix with all Labels
    const [lcp, label] = longestCommonPrefix(word, Object.keys(node.labels));
    if (node.labels[lcp]) { // If the label for the lcp exists
      return this.addWord(word.substring(lcp.length), data, node.labels[lcp]);
    }
    if (!lcp) {
      node.labels[word] = new Node(true, node).addData(data);
      return this;
    }
    // If the lcp is not null, and it does not exists, we need to rearrenge
    node.labels[lcp] = new Node(false, node);
    this.addWord(word.substring(lcp.length), data, node.labels[lcp]);
    node.labels[lcp].labels[getDifference(lcp, label)] = Object.assign({}, node.labels[label]);
    delete node.labels[label];
    return this;
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
