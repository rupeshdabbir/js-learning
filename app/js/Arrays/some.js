Array.prototype.some = function(cb) {
    if(!cb) {
    throw new Error("no cb");
    }
    for(let i = 0; i< Object(this).length; i++) {
        if(cb(Object(this)[i], i, this)){
            return true;
        };
    }
    return false;
}

var array = [1, 2, 3, 4, 5];

var even = function(element) {
  // checks whether an element is even
  return element % 9 === 0;
};

console.log(array.some(even));
// expected output: true