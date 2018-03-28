Array.prototype.reduceRight = function(cb, init) {
    if(!cb) {
        throw new Error("No cb");
    }
    let result = init ? init : Object(this)[Object(this).length -1];
    let index = init ? Object(this).length - 1 : Object(this).length - 2;
    for(let i = index; i>=0 ; i--) {
        result = cb(result, Object(this)[i], i, this);
    }
    return result;
}

const array1 = [[0, 1], [2, 3], [4, 5]].reduceRight(
    (previousValue, currentValue) => previousValue.concat(currentValue)
  );
  
  console.log(array1);
  // expected output: Array [4, 5, 2, 3, 0, 1]
