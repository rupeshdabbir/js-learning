const a = [1, 20, 30, 80, 2, 9, 3];
const test = [[1,2], [3,4], [5,6]];

Array.prototype.myReduceRight = function(cb, initialVal) {
    if(!cb)
        throw new Error("No CB defined");

    var accumulator = (initialVal === undefined) ? undefined : initialVal;

    for(var i= this.length-1; i>=0; i--){
        if(accumulator !== undefined) {
            accumulator = cb.call(undefined, accumulator, this[i], i, this)
        } else {
            accumulator = this[i];
        }
    }

    return accumulator;
}

const b = test.myReduceRight((acc, val) => {
    return acc.concat(val);
}, []);

console.log(b);