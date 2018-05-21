// Basic implementation
function memoize(func) {
    const cache = {};
    return function (...args) {
       const key = JSON.stringify(args);
       console.log(key);
       if (key in cache) {
          return cache[key];
       }
 
       return cache[key] = func(...args);
    }
 }

function demo(x) {
    return `Test Data ${x}`;
}

demo = memoize(demo);


console.log(demo(2, 3));

