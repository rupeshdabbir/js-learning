function myStringify(data) {

    if(!Array.isArray(data) && data instanceof Object) {
        return "{" +
            Object.keys(data).map( function(key){
                return `"${key}": ${myStringify(data[key])}`
            }) + "}";
    } else if (typeof data == "string") {
        return `"${data}"`;
    } else if(typeof data === "number") {
        return data;
    } else if (Array.isArray(data)) {
        return "[" +
            data.map((val) => {
                return myStringify(val);
            }) + "]";
    } else if (data.getDate !== undefined) {
        return data.toISOString();
    }

}

console.log("=== Object ===")
console.log(myStringify({ x: 5, y: "6" }));
console.log(JSON.stringify({x: 5, y: "6"}));

console.log("=== Array ===")
console.log(myStringify([1,"a"]));
console.log(JSON.stringify([1,"a"]));

//
// console.log(JSON.stringify({ x: 5, y: 6 }));
// // expected output: "{"x":5,"y":6}"
//
// console.log(JSON.stringify([new Number(3), new String('false'), new Boolean(false)]));
// // expected output: "[3,"false",false]"
//
// console.log(JSON.stringify({ x: [10, undefined, function(){}, Symbol('')] }));
// // expected output: "{"x":[10,null,null,null]}"
//
// console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));
// // expected output: ""2006-01-02T15:04:05.000Z""