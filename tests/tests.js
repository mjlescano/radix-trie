const test = require('tape');
const RadixTrie = require('../radixtrie');

test('AddWord Tests', (t) => {
  t.plan(6);
  const trie = new RadixTrie();
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
  trie.addWord('te', 'te');
  t.ok(trie.root.labels.te.eow, 'Should have eow True');

});


test('AddWord Re-Arrenge Tests', (t) => {
  t.plan(4);
  const trie = new RadixTrie();

  trie.addWord('hola', 'hola');
  trie.addWord('hoyo', 'hoyo');
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
        eow: false,
        data: [],
      },
    }, 'Should Rearrange with hola and hoyo');

  trie.addWord('holo', 'holo');
  t.deepEqual(trie.root.labels,
    {
      ho: {
        labels: {
          l: {
            labels: {
              a: {
                labels: {},
                data: ['hola'],
                eow: true,
              },
              o: {
                labels: {},
                data: ['holo'],
                eow: true,
              },
            },
            data: [],
            eow: false,
          },
          yo: {
            labels: {},
            data: ['hoyo'],
            eow: true,
          },
        },
        eow: false,
        data: [],
      },
    }, 'Should Rearrange with holo');

  trie.addWord('hoya', 'hoya');
  t.deepEqual(trie.root.labels,
    {
      ho: {
        labels: {
          l: {
            labels: {
              a: {
                labels: {},
                data: ['hola'],
                eow: true,
              },
              o: {
                labels: {},
                data: ['holo'],
                eow: true,
              },
            },
            data: [],
            eow: false,
          },
          y: {
            labels: {
              a: {
                labels: {},
                data: ['hoya'],
                eow: true,
              },
              o: {
                labels: {},
                data: ['hoyo'],
                eow: true,
              },
            },
            data: [],
            eow: false,
          },
        },
        eow: false,
        data: [],
      },
    }, 'Should Rearrange with hoya');

  trie.addWord('joya', 'joya');
  t.deepEqual(trie.root.labels,
    {
      ho: {
        labels: {
          l: {
            labels: {
              a: {
                labels: {},
                data: ['hola'],
                eow: true,
              },
              o: {
                labels: {},
                data: ['holo'],
                eow: true,
              },
            },
            data: [],
            eow: false,
          },
          y: {
            labels: {
              a: {
                labels: {},
                data: ['hoya'],
                eow: true,
              },
              o: {
                labels: {},
                data: ['hoyo'],
                eow: true,
              },
            },
            data: [],
            eow: false,
          },
        },
        eow: false,
        data: [],
      },
      joya: {
        labels: {},
        eow: true,
        data: ['joya'],
      },
    }, 'Should Rearrange with Joooooooyaaaaa!');
});
