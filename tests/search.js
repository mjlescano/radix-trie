const test = require('tape');
const RadixTree = require('../radixtree').RadixTree;

test('Search Tests FindWord', (t) => {
  t.plan(5);
  const trie = new RadixTree();
  trie.addWord('test', 'test');
  trie.addWord('testar', 'testar');
  trie.addWord('tester', 'tester');
  t.deepEqual(trie.findWord('testar'),
    {
      word: 'testar',
      data: ['testar'],
    }, 'Should find testar');
  t.deepEqual(trie.findWord('tester'),
    {
      word: 'tester',
      data: ['tester'],
    }, 'Should find tester');
  t.notOk(trie.findWord('testeando'), 'Shouldn\'t find testeando');
});
