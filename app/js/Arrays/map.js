Array.prototype.map = function(cb) {
    if(!cb) {
        throw new Error("No callback found");
    }
    let result = [];
    for(let i = 0; i< Object(this).length; i++) {
        result.push(cb(Object(this)[i], i));
    }
    return result;
};

let a = [1,2,3].map((val, index) => {
    return val * index;
});

console.log(a);


