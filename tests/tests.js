const test = require('tape');
const RadixTrie = require('../radixtrie');

test('AddWord Tests', (t) => {
  t.plan(6);
  const trie = new RadixTrie('es');
  trie.addWord('test', 'test');
  const r = trie.root.labels;
  t.ok(r.test && r.test.eow, 'Created Trie with one word');

  trie.addWord('test', 'test');
  t.ok(r.test && r.test.eow && r.test.data.length === 2, 'Created Trie with one word and two documents');

  trie.addWord('testeando', 'testeando');
  t.ok(r.test.labels.eando && r.test, 'Should add new word without Re-Arrenge');

  trie.addWord('testar', 'testar');
  t.ok(r.test.labels.eando && r.test.labels.ar, 'Should add new word without Re-Arrenge');

  trie.addWord('teresa', 'teresa');
  t.ok(r.te.labels.st && r.te.labels.resa && r.te.labels.st.labels.eando
      && r.te.labels.st.labels.ar, 'Should Rearrange');
  trie.addWord('te', 'te');
  t.ok(trie.root.labels.te.eow, 'Should have eow True');
});


test('AddWord Re-Arrenge Tests', (t) => {
  t.plan(4);
  const trie = new RadixTrie();
  const r = trie.root.labels;
  trie.addWord('hola', 'hola');
  trie.addWord('hoyo', 'hoyo');
  t.ok(r.ho.labels.la && r.ho.labels.yo, 'Should Rearrange with hola and hoyo');

  trie.addWord('holo', 'holo');
  t.ok(r.ho.labels.l && r.ho.labels.yo && r.ho.labels.l.labels.a && r.ho.labels.l.labels.o,
      'Should Rearrange with holo');

  trie.addWord('hoya', 'hoya');
  t.ok(r.ho.labels.l.labels.a && r.ho.labels.y.labels.a && r.ho.labels.y.labels.o,
    'Should Rearrange with hoya');

  trie.addWord('joya', 'joya');
  t.ok(r.ho && r.joya && r.ho.labels.l.labels.a, 'Should Rearrange with Joooooooyaaaaa!');
});

test('Count words', (t) => {
  const trie = new RadixTrie();
  const words = ['toni', 'tono', 'tralice', 'prueba', 'hellow', 'chao'];
  trie.addMany(words);
  t.equal(trie.count, words.length, 'Should count all words');
  const sw = ['un', 'unas', 'data'];
  trie.addMany(sw, 'data');
  t.equal(trie.count, words.length + 1, 'Should not add stopwords');
  trie.removeWord('data', 'data');
  t.equal(trie.count, words.length, 'Should remove one');
  t.end();
});

