const test = require('tape');
const RadixTree = require('../radixtree').RadixTree;

test('timing test', (t) => {
  t.plan(5);
  const trie = new RadixTree();
  trie.addWord('test', 'test');
  t.deepEqual(trie.root.labels,
    { test: { labels: {}, data: ['test'], eow: true } }, 'Created Trie with one word');

  trie.addWord('test', 'test');
  t.deepEqual(trie.root.labels,
    { test: { labels: {}, data: ['test', 'test'], eow: true } }, 'Created Trie with one word and two documents');

  trie.addWord('testeando', 'testeando');
  t.deepEqual(trie.root.labels,
    {
      test: {
        labels: {
          eando: {
            labels: {},
            data: ['testeando'],
            eow: true,
          },
        },
        data: ['test', 'test'],
        eow: true,
      },
    }, 'Should add new word without Re-Arrenge');

  trie.addWord('testar', 'testar');
  t.deepEqual(trie.root.labels,
    {
      test: {
        labels: {
          eando: {
            labels: {},
            data: ['testeando'],
            eow: true,
          },
          ar: {
            labels: {},
            data: ['testar'],
            eow: true,
          },
        },
        data: ['test', 'test'],
        eow: true,
      },
    }, 'Should add new word without Re-Arrenge');

  trie.addWord('teresa', 'teresa');
  t.deepEqual(trie.root.labels,
    {
      te: {
        labels: {
          st: {
            labels: {
              eando: {
                labels: {},
                data: ['testeando'],
                eow: true,
              },
              ar: {
                labels: {},
                data: ['testar'],
                eow: true,
              },
            },
            data: ['test', 'test'],
            eow: true,
          },
          resa: {
            labels: {},
            data: ['teresa'],
            eow: true,
          },
        },
        eow: false,
        data: [],
      },
    }, 'Should Rearrange');
});
