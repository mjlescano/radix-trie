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
    this.eow = true;
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
    if (!lcp) {
      node.labels[word] = new Node(true, node).addData(data);
      return this;
    }
    if (node.labels[lcp]) { // If the label for the lcp exists
      return this.addWord(word.substring(lcp.length), data, node.labels[lcp]);
    }
    // If the lcp is not null, and it does not exists, we need to rearrenge
    node.labels[lcp] = new Node(false, node);
    this.addWord(word.substring(lcp.length), data, node.labels[lcp]);
    node.labels[lcp].labels[getDifference(lcp, label)] = node.labels[label];
    delete node.labels[label];
    return this;
  }
  addMany(wordArray, data) {
    wordArray.sort().forEach(word => this.addWord(word, data));
  }
  findPartial(word) {
    const node = this.find(word);
    return this.extractNodes(node);
  }

  extractNodes(node) {
    if (!Object.keys(node.labels).length) {
      return node.data;
    }
    return node.data.concat(this.concatMap(Object.keys(node.labels), label => this.extractNodes(node.labels[label])));
  }

  search(word, tree) {
    if (!word) {
      return this;
    }
    for (let i = 1; i <= word.length; i += 1) {
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

  findNode(word) {
    const node = this.find(word);
    if (node) {
      return {
        word,
        data: node.data,
      };
    }
    return node;
  }

  findData(substring, node) {
    if(!node) {
      node = this.root;
    }
    if(substring.length < 1 || isEmpty(node.labels)) {
      return this.getData(node);
    }
    for (let i = 1; i <= substring.length; i += 1) {
      if (node.labels.hasOwnProperty(substring.slice(0,i))) {
        return this.findData(substring.slice(i), node.labels[substring.slice(0,i)]);
      }
    }
    for (let i in Object.keys(node.labels) ) {
      let label = Object.keys(node.labels)[i]
      if(substring.charAt(0) === label.charAt(0)) {
          return this.findData(getDifference(label, substring), node.labels[label]);    
      }
      return this.getData(node.labels[label]);
    };
  }

  autocomplete(substring, node, words) {
    if(!node) node = this.root;
    if(!words) words = [];
    
    if(node.eow) {
      words.push(substring);
    }
    for (let i in Object.keys(node.labels) ) {
      let label = Object.keys(node.labels)[i]
      if(substring.charAt(0) === label.charAt(0)) {
        return this.findData(getDifference(label, substring), node.labels[label]);    
      }
    };
    return words;
  }

  getData(node) {
    if(!node) node = this.root;
    if(isEmpty(node.labels)) return node.data;
    return node.data.concat(this.concatMap(Object.keys(node.labels),
       label => this.getData(node.labels[label])));
  };

  removeData(node, parent, data, word) {
    if (node.data.length > 1 || Object.keys(node.labels).length > 1) {
      node.data = node.data.filter(id => id !== data)
    }
    if (node.data.length == 0 && Object.keys(node.labels).length == 0) {
      delete parent.labels[word];
    }
  }

  reorderNodes(node, parent, word) {
    if (node.data.length == 0 && Object.keys(node.labels).length == 1) {
      const label = Object.keys(node.labels)[0];
      delete parent.label[word];
      parent.labels[word.concat(label)] = node.labels[label];
    }
  }

  findAndRemove(word, data, tree) {
    if(this.label[word]) {
      this.removeData(this.label[word], this, data, word);
      return this;
    }
    for (let i = word.length - 1; i > 0; i -= 1) {
      if (this.labels[word.slice(0, i)]) {
        tree.findAndRemove.call(this.labels[word.slice(0, i)], word.slice(i), data, tree);
        reorderNodes(this.label[word], this, word);
        return true;
      }
    }
    return false;
  }

  removeWord(word, data) {
    return this.findAndRemove.call(this.root, word, this)
  }

  update(oldWordArray, newWordArray, data) {
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
