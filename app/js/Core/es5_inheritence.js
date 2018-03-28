function User(name) {
    this.type = "User";
}

User.prototype.getName = function() {
    return this.name;
}

function Siddharth(name) {
    this.name = name;
    Object.getPrototypeOf(Siddharth.prototype).constructor.call(this,name);
}

Siddharth.prototype = Object.create(User.prototype);

let newSiddharth = new Siddharth('sid');

console.log(newSiddharth.getName());
