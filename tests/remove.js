const test = require('tape');
const RadixTrie = require('../radixtrie');

test('Remove Word Test', (t) => {
  t.plan(4);
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

  const trie2 = new RadixTrie();
  const r2 = trie2.root.labels;

  trie2.addWord('ho', 'ho');
  trie2.addWord('hola', 'hola');
  trie2.addWord('holo', 'holo');
  trie2.removeWord('hola', 'hola');
  t.ok(r2.ho.labels.lo.eow && r2.ho.eow, 'Should Rearrange to ho-lo');

  trie2.addWord('hola', 'hola');
  trie2.removeWord('hola', 'hola');
  t.notOk(trie2.findNode('hola'), 'No encontro el nodo hola');
});
