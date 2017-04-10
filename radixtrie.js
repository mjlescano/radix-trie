const isEmpty = require('./utils.js').isEmpty;
const longestCommonPrefix = require('./utils.js').longestCommonPrefix;
const getDifference = require('./utils.js').getDifference;
const concatMap = require('./utils.js').concatMap;
const uuid = require('./utils.js').uuid;
const intersection = require('./utils.js').intersection;


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
    if (!data.id) {
      data = { id: uuid(), data };
    }
    this.data.push(data);
    this.eow = true;
    return this;
  }
}


module.exports = class radixTrie {
  constructor() {
    this.root = new Root();
  }
  addWord(word, data, node) {
    word = word.toLowerCase();
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
    data = { id: uuid(), data };
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
    return node.data.concat(concatMap(Object.keys(node.labels),
      label => this.extractNodes(node.labels[label])));
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
    if (!node) {
      node = this.root;
    }
    if (substring.length < 1 || isEmpty(node.labels)) {
      return this.getData(node);
    }
    for (let i = 1; i <= substring.length; i += 1) {
      if (node.labels.hasOwnProperty(substring.slice(0, i))) {
        return this.findData(substring.slice(i), node.labels[substring.slice(0, i)]);
      }
    }
    for (let j = 0; j < Object.keys(node.labels).length; j += 1) {
      const label = Object.keys(node.labels)[j];
      let next = 0;
      for (let z = 0; z <= substring.length; z += 1) {
        if (substring.charAt(z) === label.charAt(z)) {
          next = z + 1;
        } else {
          break;
        }
      }
      if (next) {
        return this.findData(substring.slice(next), node.labels[label]);
      }
    }
    return null;
  }

  findMany(arrayOfWords) {
    return intersection(arrayOfWords.map(word => this.findData(word))[0]);
  }

  autocomplete(substring, node, words, word) {
    if (!node) node = this.root;
    if (!words) words = [];
    if (!word) word = '';
    if (node.eow) {
      words.push(word);
    }
    Object.keys(node.labels).forEach((label) => {
      let next = 0;
      for (let z = 0; z <= substring.length; z += 1) {
        if (substring.charAt(z) === label.charAt(z)) {
          next = z + 1;
        } else {
          break;
        }
      }
      if (next || substring.length === 0) {
        this.autocomplete(substring.slice(next), node.labels[label], words, word + label);
      }
    });
    return words;
  }

  getData(node) {
    if (!node) node = this.root;
    if (isEmpty(node.labels)) return node.data;
    if (node.data) {
      return node.data.concat(concatMap(Object.keys(node.labels),
         label => this.getData(node.labels[label])));
    }
    return [].concat(concatMap(Object.keys(node.labels),
       label => this.getData(node.labels[label])));
  }

  removeData(node, parent, data, word) {
    if (node.data.length > 1 || Object.keys(node.labels).length > 1) {
      node.data = node.data.filter(id => id !== data);
      if (node.data.length === 0 && Object.keys(node.labels).length > 1){
        node.eow = false;
      }
    }
    if (node.data.length <= 1 && Object.keys(node.labels).length == 0) {
      delete parent.labels[word];
    }
  }

  reorderNodes (node, parent, word) {
    if (node.data.length === 0 && Object.keys(node.labels).length == 1) {
      const label = String(Object.keys(node.labels));
      delete parent.labels[word];
      parent.labels[word.concat(label)] = node.labels[label];
    }
  }

  findAndRemove(word, data, tree) {
    if (this.labels[word]) {
      tree.removeData(this.labels[word], this, data, word);
      return this;
    }
    for (let i = 1; i <= word.length; i += 1) {
      if (this.labels[word.slice(0, i)]) {
        tree.findAndRemove.call(this.labels[word.slice(0, i)], word.slice(i), data, tree);
        tree.reorderNodes(this.labels[word.slice(0, i)], this, word.slice(0, i));
        return true;
      }
    }
    return false;
  }

  removeWord(word, data) {
    const tree = this;
    return this.findAndRemove.call(this.root, word, data, tree)
  }

  update(oldWordArray, newWordArray, data) {
    oldWordArray.forEach((oldWord) => {
      this.removeWord(oldWord, data);
    });
    this.addMany(newWordArray, data);
  }
}
