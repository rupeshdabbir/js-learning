Array.prototype.reduce = function(cb, init) {
    if(!cb) {
        throw new Error("Missing values");
    }
    let result = init ? init : Object(this)[0];
    let index = init ? 0 : 1;
    for(let i = index; i< Object(this).length; i++) {
        result = cb(result, Object(this)[i]);
    }
    return result;
}

const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
