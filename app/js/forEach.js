Array.prototype.myEach = (cb) =>  {
    console.log(this);
}


let a = [1,2,3,4];
// Native implementation
// a.forEach(function(val, index) {
//     console.log(val);
// })

a.myEach(function(val, i) {
    console.log(val);
});