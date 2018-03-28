const a = [1, 20, 30, 80, 2, 9, 3];




Array.prototype.myFilter = function(cb, context) {
    var arr = [];
    for(var i=0; i<this.length; i++) {
        if (cb.call(context, this[i], i, this))
            arr.push(this[i]);
    }
    return arr;
}

const b = a.myFilter((val, i)=> {
    return val >=10;
});

console.log(b);