const test = require('tape');
const RadixTree = require('../radixtree').RadixTree;

test('Search Tests FindWord', (t) => {
  t.plan(3);
  const trie = new RadixTree();
  trie.addWord('test', 'test');
  trie.addWord('testar', 'testar');
  trie.addWord('tester', 'tester');
  t.deepEqual(trie.findNode('testar'),
    {
      word: 'testar',
      data: ['testar'],
    }, 'Should find testar');
  t.deepEqual(trie.findNode('tester'),
    {
      word: 'tester',
      data: ['tester'],
    }, 'Should find tester');
  t.notOk(trie.findNode('testeando'), 'Shouldn\'t find testeando');
});


test('Search Find Data by substring', (t) => {
  t.plan(7);
  const trie = new RadixTree();
  trie.addWord('test', 'test');
  trie.addWord('testar', 'testar');
  trie.addWord('tester', 'tester');
  trie.addWord('hola', 'hola');
  trie.addWord('hugo', 'hugo');
  trie.addWord('hula', 'hula');
  trie.addWord('huda', 'huda');
  trie.addWord('hudo', 'hudo');

  t.equal(trie.findData('test').length,
    3, 'Should find three by test ');
  t.equal(trie.findData('t').length,
    3, 'Should find three by t');

  t.equal(trie.findData('h').length,
    5, 'Should find five ');
  t.equal(trie.findData('hola').length,
    1, 'Should find one by hola');
  
  t.equal(trie.findData('hu').length,
    4, 'Should find four by hu');

  t.equal(trie.findData('hud').length,
    2, 'Should find Two by hud ');

  t.equal(trie.findData('hudo').length,
    1, 'Should find one by hudo ');

});

test('Search Find Data by substring', (t) => {
  t.plan(7);
  const trie = new RadixTree();
  trie.addWord('test', 'test');
  trie.addWord('testar', 'testar');
  trie.addWord('tester', 'tester');
  trie.addWord('hola', 'hola');
  trie.addWord('hugo', 'hugo');
  trie.addWord('hula', 'hula');
  trie.addWord('huda', 'huda');
  trie.addWord('hudo', 'hudo');

  t.equal(trie.findData('test').length,
    3, 'Should AutoComplete three by test ');
  t.equal(trie.findData('t').length,
    3, 'Should find three by t');
  t.equal(trie.findData('h').length,
    5, 'Should AutoComplete five by h ');
  t.equal(trie.findData('hola').length,
    1, 'Should AutoComplete one by hola');
  t.equal(trie.findData('hu').length,
    4, 'Should AutoComplete four by hu');
  t.equal(trie.findData('hud').length,
    2, 'Should AutoComplete two by hud');
  t.equal(trie.findData('hudo').length,
    1, 'Should AutoComplete one by hudo ');

});

