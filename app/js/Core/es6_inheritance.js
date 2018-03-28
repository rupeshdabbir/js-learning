class User {
    constructor() {
        this.type= "user";
        this.name = "generic user";
    }

    getName() {
        return this.name;
    }
}

class Siddharth extends User {
    constructor(name) {
        super(name);
        this.name = name;
    }

    getType() {
        return this.type;
    }
}

let newSiddharth = new Siddharth("sid");

console.log(newSiddharth.getName(), newSiddharth.getType());