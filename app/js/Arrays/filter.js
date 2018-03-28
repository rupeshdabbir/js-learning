Array.prototype.filter = function(cb) {
    if(!cb) {
        throw new Error("No cb")
    }
    let result = [];
    for(let i =0; i< Object(this).length; i++) {
        if(cb(Object(this)[i], i)) {
            result.push(Object(this)[i]);
        };
    }
    return result;
};


var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]