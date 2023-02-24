'use strict';

// How Passing Arguments Works: Values vs. Reference
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    console.log();('Checked in');
  } else {
    console.log();('Wrong passport!');
  }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;


// FIRST-CLASS FUNCTIONS
// JavaScript treats functions as first-class citizens
// This means that functions are simply values
// Functions are just another “type” of object

// HIGHER-ORDER FUNCTIONS
// A function that receives another function as an
// argument, that returns a new function, or both

const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
  };
  
  const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
  };
  
  // Higher-order function
  const transformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);
  
    console.log(`Transformed by: ${fn.name}`);
  };
  
  transformer('JavaScript is the best!', upperFirstWord); // upperFirstWord - collback function
  transformer('JavaScript is the best!', oneWord); // oneWord - collback function


// Functions Returning Functions
// const greet = function (greeting) {
//     return function (name) {
//         console.log(`${greeting} ${name}`);
//     };
// };

//the same
const greet = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

// The call and apply Methods
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(23, 'Sarah Williams');

// CALL method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);
book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);


// APPLY method
//for arrays
const flightData = [583, 'George Cooper'];
book.apply(lufthansa, flightData);
console.log(lufthansa);

//ES6
book.call(lufthansa, ...flightData);


//BIND
const bookEW = book.bind(eurowings)
const bookLH = book.bind(lufthansa)
bookEW(23, 'Steaven asdasd')
bookLH(23, 'Steaven asdasd')

//bind with preset
const boorEW23 = book.bind(eurowings, 23)
boorEW23('qwe')

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));


// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(100));
console.log(addVAT(23));

// addVAT2 = value => value + value * 0.23;
const addVAT2 = function(rate) {
  return function(value) {
    return value + value * rate;
  }
}

console.log(addVAT2(0.23)(100));


// Immediately Invoked Function Expressions (IIFE)
// const runOnce = function() {
//   console.log('This will never run again!');
// }

// runOnce();

(function() {
  console.log('This will never run again!');
})();

(() => console.log('This will also never run again!'))();

{
  const isPrivate = 0;
  var notPrivate = 0;
}
// console.log(isPrivate); // error
console.log(notPrivate);


// CLOUSERS
// A function has access to the variable environment (VE) of the execution context in which it was created
// Closure: VE attached to the function, exactly as it was at the time and place the function was created
const secureBooking = function() {
  let passengerCount = 0;

  return function() {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  }
}

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);


//example1 
let f;
const k = 123;

const g = function() {
  const a = 23
  f = function() {
    console.log(a * 2, k);
  }
}

const h = function() {
  const b = 777;
  f = function() {
    console.log(b * 2);
  }
}

g();
f();
console.dir(f);

//re-asigned f function
h();
f();
console.dir(f);

//example2
const boardPassengers = function (n, wait) {
  // const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);