// Speed up calls to hasOwnProperty
const hasOwnProperty = Object.prototype.hasOwnProperty;

exports.isEmpty = function (obj) {
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== 'object') return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }
  return true;
};

exports.longestCommonPrefix = function (word, labels) {
  const l = labels.sort();
  let lcp;
  let label;
  for (let i = 0; i < l.length; i += 1) {
    if (word.charAt(0) < l[i].charAt(0)) {
      lcp = '';
      break;
    } else if (word.charAt(0) === l[i].charAt(0)) {
      label = l[i];
      lcp = label;
      while (word.indexOf(lcp) !== 0) {
        lcp = lcp.slice(0, -1);
      }
      break;
    }
  }
  return [lcp, label];
};


exports.getDifference = function(a, b){
  var i = 0;
  var j = 0;
  var result = "";

  while (j < b.length){
    if (a[i] != b[j] || i == a.length)
      result += b[j];
    else
      i++;
    j++;
  }
  return result;
};

exports.concatMap = function (arr, fn) {
  const newArr = arr.map(elem => fn(elem));
  const finalArr = [];
  newArr.forEach((nArr) => {
    nArr.forEach(elem => finalArr.push(elem));
  });
  return finalArr;
};

exports.uuid = function uuid() {
  let i;
  let random;
  let result = '';
  for (i = 0; i < 32; i += 1) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
        result += '-';
    }
    result += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
        .toString(16);
  }
  return result;
};

exports.unique = function(array) {
  const result = [];
  const seen = [];
  const length = array.length;
  for (let i = 0; i < length; i += 1) {
    const value = array[i].id;
    if (seen.indexOf(value) === -1) {
      result.push(array[i]);
      seen.push(value);
    }
  }
  return result;
};

exports.intersection = function intersection(array) {
  if (!array[0]) return [];
  const result = [];
  const seen = [];
  const argsLength = array.length;
  const length = array[0].length;
  for (let i = 0; i < length; i += 1) {
    const item = array[0][i];
    if (seen.indexOf(item.id) !== -1) continue;
    let j;
    for (j = 1; j < argsLength; j += 1) {
      if (!array[j]) return [];
      const argId = array[j].map(item => item.id);
      if (argId.indexOf(item.id) === -1) break;
    }
    if (j === argsLength) {
      result.push(item);
    }
    seen.push(item.id);
  }
  return result;
};

exports.replaceRareChar = (function replaceRareChar() {
  var regexExp = /[áóéíúÁÓÉÍÚäàâạÄÀÂẠëèêẹËÈÊẸïìîịÏÌÎỊüùûụÜÙÛỤöòôọÖÒÔỌÇç]/g;
  var translate = {
    'á': 'a', 'ó': 'o', 'ú': 'u', 'í': 'i',
    'Á': 'A', 'Ó': 'O', 'Ú': 'U', 'Í': 'I',
    'ä': 'a', 'à': 'a', 'â': 'a', 'ạ': 'a',
    'Ä': 'A', 'À': 'A', 'Â': 'A', 'Ạ': 'A',
    'ë': 'e', 'è': 'e', 'ê': 'e', 'ẹ': 'e',
    'Ë': 'E', 'È': 'E', 'Ê': 'E', 'Ẹ': 'E',
    'ï': 'i', 'ì': 'i', 'î': 'i', 'ị': 'i',
    'Ï': 'I', 'Ì': 'I', 'Î': 'I', 'Ị': 'I',
    'ü': 'u', 'ù': 'u', 'û': 'u', 'ụ': 'u',
    'Ü': 'U', 'Ù': 'U', 'Û': 'U', 'Ụ': 'U',
    'ö': 'o', 'ò': 'o', 'ô': 'o', 'ọ': 'o',
    'Ö': 'O', 'Ò': 'O', 'Ô': 'O', 'Ọ': 'O',
    'Ç': 'C', 'ç': 'c',
  };
  return function(str) {
    return ( str.replace(regexExp, function(match) { 
      return translate[match]; 
    }) );
  }
})();
