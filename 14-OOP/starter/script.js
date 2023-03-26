'use strict';

// Constructor function
const Person = function(firstName, birthYear) {
    // Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Newer create method in constructor function
    // this.calcAge = function() {
    //     console.log(2037 - this.birthYear);
    // }
} 

// static method
Person.hey = function() {
    console.log('Hey there!');
}

Person.hey();

const jonas = new Person('Jonas', 1991);

console.log(jonas);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);


console.log(matilda, jack);

console.log(jonas instanceof Person);

// Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species);
console.log(jonas.__proto__.species);
console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));


// Object prototype
console.log(jonas.__proto__.__proto__);
console.dir(Person.prototype.constructor);


const arr = [3, 4, 5, 6, 7, 3, 7];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

// Bad practice. Dont add methods to standart objects
Array.prototype.unique = function() {
    return [...new Set(this)];
}

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);
console.dir(x => 1);


// ES6 class
//class expression
// const PersonCL = class {}

//class declaretion
class PersonCL {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Method will be added to .prototype зкщзукен
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    greet() {
        console.log(`Hey ${this.firstName}`);
    }

    get age() {
        return 2037 - this.birthYear;
    }

    // Set a property that already exist
    set fullName(name) {
        if (name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name!`);
    }

    get fullName() {
        return this._fullName;
    }

    //static method
    static hey = function() {
        console.log('Hey there!');
    }
}

const jessica = new PersonCL('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCL.prototype);

// PersonCL.prototype.greet = function() {
//     console.log(`Hey ${this.firstName}`);
// }

jessica.greet();
console.log(jessica.age);

const walter = new PersonCL('Walter white', 1999);

PersonCL.hey();

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode


// getters and setters
const account = {
    owner: 'jonas',
    movements: [200, 500, 300, 400],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);
    }
}

console.log(account.latest);
account.latest = 50;
console.log(account.latest);


// Object.create
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__);
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();


// Inharitance
// const Person = function(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
// } 

// Person.prototype.calcAge = function() {
//     console.log(2037 - this.birthYear);
// };

const Student = function(firstName, birthYear, cource) {
    Person.call(this, firstName, birthYear);
    this.cource = cource;
} 

// Linking prototypes
Student.prototype = Object.create(Person.prototype)
Student.prototype.constructor = Student;

Student.prototype.introduce = function() {
    console.log(`My name is ${this.firstName}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();
console.log(mike);


// Inharitance ES6
// class PersonCL {
//     constructor(fullName, birthYear) {
//         this.fullName = fullName;
//         this.birthYear = birthYear;
//     }

//     // Method will be added to .prototype зкщзукен
//     calcAge() {
//         console.log(2037 - this.birthYear);
//     }

//     greet() {
//         console.log(`Hey ${this.firstName}`);
//     }

//     get age() {
//         return 2037 - this.birthYear;
//     }

//     // Set a property that already exist
//     set fullName(name) {
//         if (name.includes(' ')) this._fullName = name;
//         else alert(`${name} is not a full name!`);
//     }

//     get fullName() {
//         return this._fullName;
//     }

//     //static method
//     static hey = function() {
//         console.log('Hey there!');
//     }
// }

class StudentCL extends PersonCL {
    constructor(fullName, birthYear, cource) {
        // Always need to happen first!
        super(fullName, birthYear);
        this.cource = cource;
    }

    introduce = function() {
        console.log(`My name is ${this.fullName}`);
    };
}

const martha = new StudentCL('Martha Jons', 2020, 'Computer Science');
martha.introduce();
martha.calcAge();


// Inharitance Object.create
// const PersonProto = {
//     calcAge() {
//         console.log(2037 - this.birthYear);
//     },

//     init(firstName, birthYear) {
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     },
// };

// const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
Student.init = function(firstName, birthYear, cource) {
    PersonProto.init.call(this, firstName, birthYear);
    this.cource = cource;
}

StudentProto.introduce = function() {
    console.log(`My name is ${this.firstName}`); 
}
const jay = Object.create(StudentProto);
jay.init('Jay', 2013);
jay.introduce();
jay.calcAge();


// Public fields
// Private fields
// Public methods
// Private methods
// there is also a static version

class Account {
    // Public fields (instances)
    locale = navigator.language;
    // _movements = [];

    // Private fields (instances)
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        // protected property
        // this._pin = pin;
        this.#pin = pin;
        // this._movements = [];
        // this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${this.owner}!`);
    }

    // Publick methods

    // Public interface
    getMovements() {
        // return this._movements;
        return this.#movements;
    }

    deposit(val) {
        // this._movements.push(val);
        this.#movements.push(val);

        // make the method chainable
        return this;
    }

    withdrow(val) {
        this.deposit(-val);
        return this;
    }

    // protected method
    _approveLoan() {
        return true;
    }

    // // private method
    // #approveLoan() {
    //     return true;
    // }

    requestLoan(val) {
        if (this._approveLoan()) {
        // if (this.#approveLoan()) {
            this.deposit(val);
            console.log('Loan approved');
            return this;
        }
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

// acc1.movements.push(200);
// acc1.movements.push(-100);

acc1.deposit(200);
acc1.withdrow(100);
acc1.requestLoan(1000);
console.log(acc1.getMovements());

// console.log(acc1.#movements); // error
// console.log(acc1.#pin); // error
// console.log(acc1.#approveLoan(1)); // error

// Chaining methods
acc1.deposit(300).deposit(500).withdrow(35).requestLoan(35000).withdrow(1000);
console.log(acc1.getMovements());