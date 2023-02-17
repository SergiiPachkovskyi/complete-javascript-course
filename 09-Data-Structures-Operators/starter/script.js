'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sun'];

const openingHours = {
  // thu: {
  // ES6
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // openingHours: openingHours,
  // ES6
  openingHours,

  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },
  // ES6
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order resived! ${this.starterMenu[starterIndex]} ${this.mainMenu[mainIndex]} will be delivered to ${address} at the ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Pasta: ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...othersIngredients) {
    console.log(mainIngredient);
    console.log(othersIngredients);
  },
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
});

// DESTRUCTING objects
// const { name, categories, openingHours } = restaurant;
// console.log(name, categories, openingHours);

// const {
//   name: restaurantName,
//   categories: tags,
//   openingHours: hours,
// } = restaurant;
// console.log(restaurantName, tags, hours);

// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

//Nestes objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

/* // DESTRUCTING arreys
// ordinary assignment
const arr = [1, 2, 3];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// destructuring assignment
const [x, y, z] = arr;
console.log(x, y, z);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// // ordinary
// const temp = main;
// main = secondary;
// secondary = temp;

// destructuring
[main, secondary] = [secondary, main];
console.log(main, secondary);

const [starter, mainCource] = restaurant.order(2, 0);
console.log(starter, mainCource);

// nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;
console.log(i, j, k);

// default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); */

// SPREAD operator
// uses to unpack an array
// can be used for all iterables
// array, string, map, set
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];

const newArr = [1, 2, ...arr]; // ... gets all elements out of array

console.log(arr);
console.log(badNewArr);
console.log(newArr);

console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(...newMenu);

// copy array
const mainMenuCopy = [...restaurant.mainMenu];

// join arrey
const fullMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];

const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);

// const ingridients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("Let's make pasta! Ingredient 2"),
//   prompt("Let's make pasta! Ingredient 3?"),
// ];
// console.log(ingridients);

// // restaurant.orderPasta(ingridients[0], ingridients[1], ingridients[2]);
// restaurant.orderPasta(...ingridients);

// Objects
const newRestaurant = { foundedIn: '1990', ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
console.log(restaurantCopy);

// REST
// uses to pack an array

// 1. destructuring

// spread, becouse on right side of =
const arr2 = [1, 2, ...[3, 4]];

// spread, becouse on left side of =
const [s, d, ...others] = [1, 2, 3, 4, 5];
console.log(s, d, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekDays } = restaurant.openingHours;
console.log(weekDays);

// 2. function
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3);
add(2, 3, 4);
add(2, 3, 4, 5);
add(...[1, 2, 3, 4, 5]);

restaurant.orderPizza('mushrooms', 'onion', 'oliver');

// ||
// return first truthy value or last value
console.log(3 || 'Jonah');
console.log('' || 'Jonah');
console.log(true || 0);
console.log(undefined || null);

// &&
// return first falsy value last value
console.log(0 && 'Jonah');
console.log(7 && 'Jonah');
console.log(7 && 'Jonah' && null && 'asd');

// NULLISH operator
// react to 0 and ''
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

const guests2 = restaurant.numGuests ?? 10;
console.log(guests2);

const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 20,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Gipvanni Rossi',
};

// OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// Nullish assignment operator
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND assignment operator
rest1.owner &&= 'anonymous';
rest2.owner &&= 'anonymous';

console.log(rest1);
console.log(rest2);


const menu_ = [...restaurant.starterMenu, ...restaurant.mainMenu]

for (const item of menu_) console.log(item);

for (const [i, item] of menu_.entries()) console.log(i, item);

// OPTIONAL CHAINING
// without ES6
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}
// ES6
console.log(restaurant.openingHours?.mon?.open);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed'
  console.log(day, open);
}

// methods
console.log(restaurant.order?.(0, 1) ?? 'Method not exist!');
console.log(restaurant.orderASD?.(0, 1) ?? 'Method not exist!');

// arrays
const users = {
  name: 'Jonas',
  email: 'asd@asd'
};
console.log(users[0]?.name ?? 'Users array is empty!');


// LOOPING OBJECTS
const properties = Object.keys(openingHours)
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;
for (const day of Object.keys(openingHours)) {
  openStr += `${day} `;
}
console.log(openStr);

const values = Object.values(openingHours);
console.log(values);

const entries = Object.entries(openingHours);
for (const [key, {open, close}] of entries) {
  console.log(`on ${key} we open at ${open} and close at ${close}`);
}


// SET
// without duplicates
const ordersSet = new Set([1, 2, 3, 3])
console.log(ordersSet);

console.log(new Set('Jonas'));
console.log(ordersSet.size); // insted length
console.log(ordersSet.has(2)); // insted include
ordersSet.add(4);
ordersSet.add(4);
console.log(ordersSet);
ordersSet.delete(3);
// ordersSet.clear();


// MAP
// like object, but can have keys of different types
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are openedd')
  .set(false, 'We are closed');

console.log(rest.get(true));
console.log(rest.get(false));
console.log(rest.get('1'));
console.log(rest.has('categories'));
console.log(rest.delete(2));
console.log(rest.size);
// rest.clear;
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);


const question = new Map([
  ['question', 'What is the vest programming language in a warls?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Python'],
  ['correct', 3],
  [true, 'correct'],
  [false, 'Try again'],
]);

console.log(question);

console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(key, value);
  }
}
// const answer = Number(prompt('Yourr answer?'));
// console.log(question.get(answer === question.get('correct')));
 
//map to array
console.log(...question);


// STRINGS
const airlines = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(airlines.length);
console.log(airlines.indexOf('r'));
console.log(airlines.lastIndexOf('r'));
console.log(airlines.indexOf('Portugal'));

console.log(airlines.slice(4));
console.log(airlines.slice(4, 7));
console.log(airlines.slice(0, airlines.indexOf(' ')));
console.log(airlines.slice(-2));
console.log(airlines.slice(1, -1));

console.log(airlines.toLowerCase());
console.log(airlines.toUpperCase());

const passenger = '  jOnAs ';
const passenger2 = passenger.toLowerCase().trim();
console.log(passenger2);

const price = '123!';
const priceUS = price.replace('!', '$');
console.log(priceUS);

const someStr = 'as dqw e eqw asd qwe wasd';
console.log(someStr.replace(/asd/g, 'ASD')); // regular expression

console.log(someStr.includes('asd'));
console.log(someStr.startsWith('asd'));
console.log(someStr.endsWith('asd'));

console.log('a+very+nice+strinng'.split('+'));

const [firstName, lastName] = 'Sergii Pachkovskyi'.split(' ');
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const message = 'go to gate 23';
console.log(message.padEnd(25, '+'));
console.log('asd asd a sd'.padStart(25, '+'));
console.log('asd'.repeat(3));

