<p align='center'>
    <img src='http://i.imgur.com/fapeAAP.png' </img>
</p>

# radix-trie

Javascript [radix-trie](https://en.wikipedia.org/wiki/Radix_tree) implementation.

![Trie](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Patricia_trie.svg/640px-Patricia_trie.svg.png)

The tree starts at it's (`root`), and is made of Nodes and Edges (`labels`). Labels are the longest common prefix of the words in the underlying nodes.
Each words generates a new node that can be reached through one or many `labels`. Information related to the word (of any kind) and a 'end of word' (`eow`) flag is stored into each node. With each new word added to the tree, the longest common prefix is computed, and the node is added 'below' the new label.

## API

### addWord(word, data)

Adds `words` to the trie and `data` as the associated info to the word.

```javascript
const RadixTrie = require('radix-trie');

const trie = new RadixTrie();
trie.addWord('hola'. 1);
trie.addWord('chao'. 'data');
trie.addWord('chos'. { ejemplo: true});
```

### addMany(wordArray, data)

Adds every word in the `wordArray` parameter to the trie. Every word will have `data` as the associated info.

```javascript
const RadixTrie = require('radix-trie');

const trie = new RadixTrie();
trie.addMany(['hola', 'chao', 'chos'], {prueba: false});
```

### findNode('word')

Returns the node in which `word` is stored. Returns `false` if there is not such node.

```javascript
const RadixTrie = require('radix-trie');

const trie = new RadixTrie();
trie.addMany(['hola', 'chao', 'chos'], {prueba: false});
trie.findNode('hola'); 
//{
//  word: 'hola',
//  data: [{prueba: false}],
//}
```

### findData(word)

Returns an array with the data of every node underlying the `word` label.

```javascript
trie.addWord('test', 1);
trie.addWord('testar', 2);
trie.addWord('tester', 3);

trie.findData('test'); // [1, 2, 3]
```

### findMany(arrayOfWords)

Returns the intersection of the results of `findData` for each word. It's useful for searching for many words at the same time.

```javascript
trie.addMany(['hola', 'test'], 1);
trie.addMany(['hola', 'teresa'], 2);
trie.addMany(['chao', 'trozo'], 3);

trie.findMany(['test', 'hola']) // 1
trie.findMany(['t']) // 1, 2 y 3
trie.findMany(['h', 't']) // 1 y 2
```

### autocomplete(substring)

Returns an array of words that start with `substring`, that is the words underlying and reacheable from the node that `substring` belongs to.

```javascript
trie.addWord('hola', 1);
trie.addWord('testar', 2);
trie.addWord('tester', 3);

trie.autocomplete('test'); // ['testar, 'tester']
```

### removeWord(word, data)

Erases the `data` associated to `word` and rearrenges the tree if necessary to mantain the radix-trie propertys.

```javascript
trie.addWord('ho', 'ho');
trie.addWord('hola', 'hola');
trie.addWord('holo', 'holo');

trie.removeWord('hola', 'hola');
trie.findWord('hola', 'hola'); //false
```

## To do

- [ ] Implement `update`
- [ ] Improve sanitization of words before adding them to the trie.
- [ ] Add more languages stopwords (currently there are english and spanish versions to select from)
- [ ] Improve performance