const rword = require('rword');
const RadixTree = require('../radixtree').RadixTree;
const number = 10000;
const words = rword.generate(number);
const trie = new RadixTree();

const t0 = Date.now();
trie.addMany(words, 'test');
const tb = Date.now() - t0;
console.log(`Building Index for ${number} items: ${tb} ms`);

const t1 = Date.now();
console.log(words.every(function(word) {
  if(!trie.findWord(word)){
    return false
  }
  return true
}));
const ts = Date.now() - t1;
console.log(`Searching ${number} items: ${ts} ms`);

process.exit()