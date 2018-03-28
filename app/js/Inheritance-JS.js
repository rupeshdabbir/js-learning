// Implementing concept of inheritance ES6 and ES5

class UserES6 {

    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    // getName2 = () => {
    //     return this.name;
    // }
    getAge() {
        return this.age;
    }
}

class Rupesh extends UserES6 {
    constructor(age) {
        super(age);
        this.age = age;
    }

}

//ES5:

function UserES5(name) {
    this.name = name || "Rupesh";
}

function RupeshES5(age) {
    Object.getPrototypeOf(RupeshES5.prototype).constructor.call(age);
    this.age = age;
}

RupeshES5.prototype = Object.create(UserES5.prototype);

UserES5.prototype.getName = function() {
    return this.name;
}

UserES5.prototype.getAge = function() {
    return this.age;
}


let a = new RupeshES5(28);
console.log(a.getAge())

