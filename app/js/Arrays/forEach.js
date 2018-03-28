Array.prototype.myEach = function(a) {
  if(!a) {
    throw new Error("No callback found");
  };
  if(this.length === 0) {
    return;
  }
  for(var i = 0; i< Object(this).length; i ++) {
    a(Object(this)[i], i);
  }
};

// let a = [];
// console.log(typeof([1,2,3]))
[1,2,3].myEach((val, index) => {
  console.log(val, index);
});
