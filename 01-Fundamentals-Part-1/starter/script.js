//JAVASCRIPT IS A HIGH-LEVEL, OBJECT-ORIENTED, MULTI-PARADIGM PROGRAMMING LANGUAGE.

//<script src="script.js"></script>

//alert("hello");

console.log("hello");

// Data types
// - object
// - primitive: number, string, bullion, underfined, null, symbol, bug int

//var firstName = "Jonas"; // depricated
/* let firstName = "Jonas"; // for mutable variables
const constName = "Jonas"; // for unmutable variables */

// Line comment

/* Block
comment*/

console.log(typeof 123);

// undefined is a value and a type of the value
/* let year;
console.log(year);
console.log(typeof year); */

/*Operators:
mathematical, comparison, logical, assignment...
*/

// math
console.log(100 + 200 - 50 * 2 / 10);
console.log(2 ** 3); // power
console.log(10 % 2); // rest of division
console.log('asd' + 'qwe');

// assigmant
let x = 1;
x += 10; // x = x + 10;
x -= 5; // x = x - 5;
x++; // x = x + 1;
x--; // x = x - 1;
console.log(x);

// comparison
console.log(10 > 5); // >, <, >=, <=


// Template literals
const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const year = 2037;

let jonas = "I'm " + firstName + ', a ' + (year - birthYear) + ' years old ' + job + '!';

console.log(jonas);

jonas = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;

console.log(jonas);

console.log('String with \n\
multiple\n\
lines');

console.log(`String with
multiple
lines`);


//if else
const condition = true;

if (condition) {
    console.log('good');
} else {
    console.log('not good');
}


// Type conversion
const inputYear = '1991';
console.log(Number(inputYear) + 1);
console.log(Number('inputYear') + 1);
console.log(+inputYear + 1);
console.log(String(123), 123);

//Type coercion
console.log('I am ' + 30 + ' years old');
console.log('10' + 5 + '1'); // plus - coece to string
console.log('10' - 5 - '1'); // minus - coerce to number
console.log('20' * 2); // * - to number
console.log('20' / 2); // / - to number


//Falsy values
// 0, '', undefined, null, NaN
console.log(Boolean(NaN));


//Equality operators
console.log(18 === 18); // true
console.log('18' === 18); // false

console.log(18 == 18); // true
console.log('18' == 18); // true

// !=, !==


//const favourite = prompt('Enter number');
//console.log(favourite);


// Logical operators
// && - and
// || - or
// ! - not


//Switch
const day = 'monday';

switch (day) {
    case 'monday':
        console.log(1);
        break;
    case 'tuesday':
        console.log(2);
        break;
    case 'wednesday':
    case 'thursday':
        console.log(3, 4);
        break;
    default:
        console.log('Not valid!');
}


// Condition (Ternary) operator
const age = 23

age >= 18 ? console.log(true) : console.log(false);

const y = age >= 18 ? true : false;
console.log(y);
