Object.prototype.stringify = function(input) {
    switch(typeof input) {
        case 'string' : {
            return `\"${input}\"`;
        }
        case 'boolean' : {
            return `${input}`;
        }
        case 'number' : {
            if(input !== input || input === Infinity) {
                return 'null';
            }
            return `${input}`;
        }
        case 'undefined' : {
            return null;
        }
        case 'object': {
            if(Array.isArray(input)){
                return '[' +
                 input.map((val) => {
                    return Object.stringify(val);
                 }) +
                 ']';
            }
            if(Object.prototype.toString.call(input) === '[object Date]') {
                return `\"${input.toISOString()}\"`;
            }
            if(input === null){
                return 'null';
            }
            return '{' +
            Object.keys(input).map((val) => {
                return `${Object.stringify(val)}:${Object.stringify(input[val])}`
            })
            + '}';
        }
    }

};

console.log(Object.stringify([NaN, null, Infinity]));
console.log(JSON.stringify([NaN, null, Infinity]));
 // '[null,null,null]'
// JSON.stringify({ x: 5 });              // '{"x":5}'

// console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));
// // '"2006-01-02T15:04:05.000Z"'

// JSON.stringify({ x: 5, y: 6 });
// // '{"x":5,"y":6}'
// JSON.stringify([new Number(3), new String('false'), new Boolean(false)]);
// // '[3,"false",false]'

// JSON.stringify({ x: [10, undefined, function(){}, Symbol('')] });
// // '{"x":[10,null,null,null]}'

// // Standard data structures
// JSON.stringify([new Set([1]), new Map([[1, 2]]), new WeakSet([{a: 1}]), new WeakMap([[{a: 1}, 2]])]);
// // '[{},{},{},{}]'