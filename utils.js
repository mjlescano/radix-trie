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
  const matches = labels.map(function(label) {
    if (label[0] !== word[0]) {
      return 0;
    }
    return label.split('').reduce(function(acum, letter, index) {
      if (letter === word[index]) {
        return acum + 1;
      }
      return acum;
    }, 0);
  });
  const label = labels[matches.indexOf(Math.max(...matches))];
  let lcp = label;
  while (word.indexOf(lcp) !== 0) {
    lcp = lcp.slice(0, -1);
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
