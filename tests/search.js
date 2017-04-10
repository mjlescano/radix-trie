const test = require('tape');
const RadixTrie = require('../radixtrie');

test('Search Tests FindWord', (t) => {
  t.plan(3);
  const trie = new RadixTrie();
  trie.addWord('test', 'test');
  trie.addWord('testar', 'testar');
  trie.addWord('tester', 'tester');
  t.equal(trie.findNode('testar').word, 'testar', 'Should find testar');
  t.deepEqual(trie.findNode('tester').word, 'tester', 'Should find tester');
  t.notOk(trie.findNode('testeando'), 'Shouldn\'t find testeando');
});


test('Search Find Data by substring', (t) => {
  t.plan(7);
  const trie = new RadixTrie();
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

test('autocomplete', (t) => {
  t.plan(6);
  const trie = new RadixTrie();
  trie.addWord('test', 'test');
  trie.addWord('testar', 'testar');
  trie.addWord('tester', 'tester');
  trie.addWord('hola', 'hola');
  trie.addWord('hugo', 'hugo');
  trie.addWord('hula', 'hula');
  trie.addWord('huda', 'huda');
  trie.addWord('hudo', 'hudo');

  t.equal(trie.autocomplete('t').length,
    3, 'Should autocomplete three by test ');
  t.equal(trie.autocomplete('h').length,
    5, 'Should autocomplete five by h ');
  t.equal(trie.autocomplete('hola').length,
    1, 'Should autocomplete one by hola');
  t.equal(trie.autocomplete('hu').length,
    4, 'Should autocomplete four by hu');
  t.equal(trie.autocomplete('hud').length,
    2, 'Should autocomplete two by hud');
  t.equal(trie.autocomplete('hudo').length,
    1, 'Should autocomplete one by hudo ');
});

test('Test findMany', (t) => {
  t.plan(6);
  const trie = new RadixTrie();
  trie.addMany(['hola', 'test'], 1);
  trie.addMany(['hola', 'teresa'], 2);
  trie.addMany(['hola', 'teresa', 'chao'], 3);

  t.ok(Array.isArray(trie.findMany(['test', 'hola'])), 'Should be an Array');
  t.equal(trie.findMany(['test', 'hola']).length, 1, 'Should find only 1');
  t.equal(trie.findMany(['t', 'hola']).length, 3, 'Should find only 1 and 2 and 3');
  t.equal(trie.findMany(['c', 'hola']).length, 1, 'Should find only 3');
  t.equal(trie.findMany(['chao', 't']).length, 1, 'Should find only 3');
  t.equal(trie.findMany(['t']).length, 3, 'Should find all');
});
