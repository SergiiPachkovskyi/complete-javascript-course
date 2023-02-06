'use strict';

/* JS - high-level, prototype-based, object-oriented, multy-paradigm, interpreted or just-in-time compiled, dynamic, 
single-threaded, garbage-collected language with the first-class function and a non blocking event loop concurency model */

// Scopes: flobal, function, block

/* Hoisting: Makes some types of variables accessible/usable in the code before they are
actually declared. “Variables lifted to the top of their scope” */

// TDZ - temporal dead zone

// Varicbles
console.log(me);
// console.log(job); // error
// console.log(year); // error

var me = 'Sergii';
let job = 'Developer';
const year = 1993;

// Functions
foo1();
// foo2(); // error
// foo3(); // error

function foo1() {
  console.log(1);
}

const foo2 = function () {
  console.log(1);
};

var foo3 = () => console.log(1);

/* this keyword/variable: Special variable that is created for every execution context (every function).
Takes the value of (points to) the “owner” of the function in which the this keyword is used. */

// Primitive vs. Objects
const x = 2;
let y = x; // new memory address
y = 3;
console.log(x);
console.log(y);

const sergii = {
  firstName: 'Sergii',
  age: 30,
};

const friend = sergii; // the same memory address
friend.age = 34;

console.log(sergii);
console.log(friend);

const friend2 = Object.assign({}, sergii); // shell copy
friend2.age = 33;

console.log(sergii);
console.log(friend2);
