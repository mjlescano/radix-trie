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

exports.RadixTree = class RadixTree {
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
