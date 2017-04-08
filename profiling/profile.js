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
console.log('Find all:', words.every(function(word) {
  if(!trie.findNode(word)){
    return false
  }
  return true
}));
const ts = Date.now() - t1;
console.log(`Searching ${number} items: ${ts} ms`);

let aux = 0;
const t2 = Date.now();
words.map((word) => {
  if(word.length%3 === 0){
    aux += 1;
    trie.removeWord(word,'test');
  }
})
const tr = Date.now() - t2;
console.log(`Removing ${aux} items: ${tr} ms`);

const t3 = Date.now();
console.log('Find all:', words.every(function(word) {
  if(word.length%3 !== 0){
    if(!trie.findNode(word)){
      return false
    }
  }
  return true
}));
const tf = Date.now() - t3;
console.log(`Searching ${number - aux} items after remove: ${tf} ms`);

process.exit()