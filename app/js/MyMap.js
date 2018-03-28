let a = [1,2,3,4];

Array.prototype.myMap = function(cb) {
    var arr = [];
    for(var i=0; i<this.length; i++) {
        arr.push(cb(this[i], i, this));
    }
    return arr;
}

console.log(a.myMap((val, index) => {
   return (val * index);
}))