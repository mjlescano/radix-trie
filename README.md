<p align='center'>
    <img src='http://i.imgur.com/fapeAAP.png' </img>
</p>

# radix-trie

Implementación de un [radix-trie](https://en.wikipedia.org/wiki/Radix_tree) en JavaScript.

![Trie](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Patricia_trie.svg/640px-Patricia_trie.svg.png)

El árbol comienza en la la raíz (`root`), y contiene Nodos y aristas (`labels`). Los labels son el máximo prefijo común de las palabras que terminan en los nodos subyacentes.
Cada palabra nueva genera un nuevo nodo al que se puede llegar a través de uno o varios `labels`. En este nodo se guarda información asociada a la palabra (puede ser de cualquier tipo), y un flag que dice si es `eow` (End of Word). Con cada nueva palabra, se computa el prefijo común máximo (longest common prefix), y el nuevo nodo se ubicará debajo de este nuevo label.


## API

### addWord(word, data)

Agrega la palabra `word` al trie, y `data` como información asociada a esa palabra.

```javascript
const RadixTrie = require('radix-trie');

const trie = new RadixTrie();
trie.addWord('hola'. 1);
trie.addWord('chao'. 'data');
trie.addWord('chos'. { ejemplo: true});
```

### addMany(wordArray, data)

Agrega todas las palabras del arreglo `wordArray` al trie, todas las palabras agregadas tendran `data` como información asociada.

```javascript
const RadixTrie = require('radix-trie');

const trie = new RadixTrie();
trie.addMany(['hola', 'chao', 'chos'], {prueba: false});
```

### findNode('word')

Devuelve el nodo al cual nos lleva seguir los labels con la palabra `word`. Retorna `false` si no existe tal nodo.

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

Devuelve un arreglo con los datos de todos los nodos por debajo de los labels de `word`:

```javascript
trie.addWord('test', 1);
trie.addWord('testar', 2);
trie.addWord('tester', 3);

trie.findData('test'); // [1, 2, 3]
```

### findMany(arrayOfWords)

Devuelve la intersección de los resultados de `findData` para cada palabra. Sirve para buscar por varias palabras a la vez.

```javascript
trie.addMany(['hola', 'test'], 1);
trie.addMany(['hola', 'teresa'], 2);
trie.addMany(['chao', 'trozo'], 3);

trie.findMany(['test', 'hola']) // 1
trie.findMany(['t']) // 1, 2 y 3
trie.findMany(['h', 't']) // 1 y 2
```

### autocomplete(substring)

Devuelve un arreglo de palabras que comienzen con `substring`. o sea que estén debajo del nodo al que se pueda llegar siguiendo los labels del `substring`.

```javascript
trie.addWord('hola', 1);
trie.addWord('testar', 2);
trie.addWord('tester', 3);

trie.autocomplete('test'); // ['testar, 'tester']
```

### removeWord(word, data)

Borra la `data` asociada a `word`, y re-acomoda el árbol cuando es necesario para que mantengas las propiedades del radix-trie.

```javascript
trie.addWord('ho', 'ho');
trie.addWord('hola', 'hola');
trie.addWord('holo', 'holo');

trie.removeWord('hola', 'hola');
trie.findWord('hola', 'hola'); //false
```

## To do

- [ ] Update.
- [ ] Sanitizar palabras antes de guardarlas en el árbol.
- [ ] Filtrar stop words en varios idiomas.