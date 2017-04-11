const test = require('tape');
const RadixTrie = require('../radixtrie');

test('Remove Word Test', (t) => {
  const trie = new RadixTrie();
  const r = trie.root.labels;
  trie.addWord('hoyo', 'hoyo');
  trie.removeWord('hoyo', 'hoyo');
  t.deepEqual(trie.root.labels, {}, 'The trie Should be empty');

  trie.addWord('hola', 'hola');
  trie.addWord('joya', 'joya');
  trie.addWord('hoyo', 'hoyo');
  trie.removeWord('joya', 'joya');
  t.ok(r.ho.labels.la && r.ho.labels.yo, 'Should Rearrange without joya');
  t.end();
});

test('Remove Word another Test', (t) => {
  const trie = new RadixTrie();
  const r = trie.root.labels;

  trie.addWord('ho', 'ho');
  trie.addWord('hola', 'hola');
  trie.addWord('holo', 'holo');
  t.equal(trie.count, 3, 'Should have three words');
  trie.removeWord('hola', 'hola');
  t.ok(r.ho.labels.lo.eow && r.ho.eow, 'Should Rearrange to ho-lo');
  t.equal(trie.count, 2, 'Should have two words after remove.');
  trie.addWord('hola', 'hola');
  trie.removeWord('hola', 'hola');
  t.notOk(trie.findNode('hola'), 'No encontro el nodo hola');
  t.end();
});
