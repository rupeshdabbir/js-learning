const a = [1, 20, 30, 80, 2, 9, 3];

Array.prototype.mySome = function(cb, context) {
    for(var i=0; i<this.length; i++) {
        if(cb.call(context, this[i], i, this)) {
            return true;
        }
    }
}

Array.prototype.myEvery = function(cb, context) {
    for(var i=0; i<this.length; i++) {
        if(!cb.call(context, this[i], i, this)) {
            return false;
        }
    }
}

const res = a.myEvery((val, i) => {
    return val == 20;
});

console.log(res);