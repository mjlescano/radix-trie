const test = require('tape');
const RadixTrie = require('../radixtrie');

test('Remove Word Test', (t) => {
  t.plan(4);
  const trie = new RadixTrie();

  trie.addWord('hoyo', 'hoyo');
  trie.removeWord('hoyo', 'hoyo');
  t.deepEqual(trie.root.labels, {});

  trie.addWord('hola', 'hola');
  trie.addWord('joya', 'joya');
  trie.addWord('hoyo', 'hoyo');
  trie.removeWord('joya', 'joya');
  t.deepEqual(trie.root.labels,
    {
      ho: {
        labels: {
          la: {
            labels: {},
            data: ['hola'],
            eow: true,
          },
          yo: {
            labels: {},
            data: ['hoyo'],
            eow: true,
          },
        },
        data: [],
        eow: false,
      },
    }, 'Should Rearrange without joya');

  const trie2 = new RadixTrie();

  trie2.addWord('ho', 'ho');
  trie2.addWord('hola', 'hola');
  trie2.addWord('holo', 'holo');
  trie2.removeWord('hola', 'hola');
  t.deepEqual(trie2.root.labels,
    {
      ho: {
        labels: {
          lo: {
                labels: {},
                data: ['holo'],
                eow: true,
              },
          },
        data: ['ho'],
        eow: true,
      },
    }, 'Should Rearrange to ho-lo');

  trie2.addWord('hola','hola');
  trie2.removeWord('hola','hola');
  t.notOk(trie2.findNode('hola'), 'No encontro el nodo hola')  
});
