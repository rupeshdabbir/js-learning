Array.prototype.every = function(cb) {
    if(!cb) {
        throw new Error("no cb");
    }
    for(let i =0; i< Object(this).length; i++) {
        if(!cb(Object(this)[i], i , this)) {
            return false;
        }
    }
    return true;
}

function isBelowThreshold(currentValue) {
    return currentValue < 40;
  }
  
  var array1 = [1, 30, 43, 29, 10, 13];
  
  console.log(array1.every(isBelowThreshold));
  // expected output: true
