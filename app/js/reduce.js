const a = [1, 20, 30, 80, 2, 9, 3];

Array.prototype.myReduce = function(cb, initialVal) {
    if(!cb)
        throw new Error("No CB defined");

    var accumulator = (initialVal === undefined) ? undefined : initialVal;

    for(var i= 0; i<this.length; i++){
        if(accumulator !== undefined) {
            accumulator = cb.call(undefined, accumulator, this[i], i, this)
        } else {
            accumulator = this[i];
        }
    }

    return accumulator;
}

const b = a.myReduce((acc, val) => {
    return acc+val;
}, 10);

console.log(b);