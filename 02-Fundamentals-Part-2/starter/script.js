'use strict';

// strick mode do ttwo things:
// forbids us to do certain things
// creates visibe errors

// exemple
let hasDriversLicense = false;
const passTest = true;

// if (passTest) haesDriversLicense = true; // error with 'use strict'
if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive');

// const interface = "Audio" // the word is reserved for the future


// Functions

// func. declaretions
function foo() {
    console.log(1);
}

foo();

// func. expression
const foo2 = function () {
    console.log(1);
}

foo2();

//arrow func.
const foo3 = () => console.log(1);
foo3(1);

const foo4 = someParam => console.log(someParam);
foo4(1);

const foo5 = (someParam, someParam2) => {
    console.log(someParam, someParam2);
}
foo5(1, 2);


// Array
const friends = ['Michel', 'Steven', 'Peter'];
console.log(friends);

const years = new Array(1993, 1994, 2000);
console.log(years);

console.log(friends[0]);
console.log(friends.length);

friends[2] = 'Jay'
console.log(friends);

const jonas = ['Jonas', 35, friends]
console.log(jonas);

friends.push('Ron'); // push to the end
friends.unshift('John') // insert into begining
console.log(friends);

friends.pop(); // delete last element
console.log(friends);

friends.shift() // delete first
console.log(friends);

console.log(friends.indexOf('Steven'));
console.log(friends.includes('Bob'));


// Object
const jonasObject = {
    firstName: 'Jonas',
    job: 'teacher',
    friends: friends,
    birthYear: 1991,
    hasDriverLicense: true,

    calcAge: function () {
        return 2023 - this.birthYear;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriverLicense ? 'a' : 'no'} driver license`;
    },
}

console.log(jonasObject);

console.log(jonasObject['firstName']);
console.log(jonasObject.firstName);
console.log(jonasObject.calcAge());
console.log(jonasObject.getSummary());


// Loops
for (let rep = 1; rep <= 10; rep++) {
    console.log(rep);
}

const newArray = [];

for (let i = 0; i < friends.length; i++) {
    console.log(friends[i]);

    // if (i === 1) break;
    if (i === 1) continue;

    // newArray[i] = friends[i];
    newArray.push(friends[i]);
}

console.log(newArray);

for (let i = friends.length - 1; i >= 0; i--) {
    console.log(friends[i]);
}

let rep = 1;
while (rep <= 10) {
    console.log(rep);
    rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log(`end`);
}