// Importing module---------------------------------------

// Import by name
// import { addToCart, totalPrice as price, tq, cart } from './shoppingCart.js';
// // Import all from module
// import * as ShoppingCart from './shoppingCart.js';
// // Default import
// import add from './shoppingCart.js';
// // Mixed import
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
import { addToCart, cart } from './shoppingCart.js';

// console.log(shippingCost); // error
// console.log('Importing module');

addToCart('tomato', 10);
// ShoppingCart.addToCart('apple', 5);
// add('bread', 3)
// console.log(price, tq);

// console.log(ShoppingCart);

// console.log(cart);

// await outside of async function
// console.log('start');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('finish');

// const getLastpost = async function() {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const data = await res.json();
//     console.log(data);

//     return {title: data.at(-1).title, text: data.at(-1).body}
// }

// const lastPost = getLastpost()
// console.log(lastPost);

// // Not very clean
// lastPost.then(last => console.log(last))

// // Better way
// // const lastPost2 = await getLastpost();
// // console.log(lastPost2);


// // The Module Pattern
// const shoppingCart2 = (function() {
//     const cart = [];
//     const shippingCost = 10;
//     const totalPrice = 237;
//     const totalQuantity = 23;

//     const addToCart = function(product, quantity) {
//         cart.push({product, quantity});
//         console.log(`${quantity} ${product} added to cart`);
//     }
//     const orderStock = function(product, quantity) {
//         console.log(`${quantity} ${product} ordered from supplier`);
//     }
    
//     return {
//         addToCart,
//         cart,
//         totalPrice,
//         totalQuantity,
//     }
// }) ();


// NPM
//npm -v // check for npm
//npm init // initialization of npm
//npm install [package_name]
//npm i [package_name]
//npm i lodash-es // usefull libraries
//npm i //install all from package.json
//npm i parcel --save-dev // parcel - bundler, --save-dev - add package to devDependencies in package.json
//npm i parcel -g // -g - globally
//npx parcel index.html
// add command to package.json
// "scripts": {
//     "start": "parcel index.html"
// },
//npm run start
// remove "main" from package.json
// add command to package.json
// "scripts": {
//     ...        
//     "build": "parcel build index.html"
// },
//npm run build
//npm i regenerator-runtime // Polifilling async functions

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from 'lodash-es'
import cloneDeep from 'lodash-es/cloneDeep'
// import cloneDeep from 'lodash';

const state = {
    cart: [
        {product: 'bread', quantity: 5},
        {product: 'pizza', quantity: 5},
    ],
    user: {loggedIn: true},
}

// const stateClone = Object.assign({}, state);
// stateClone.user.loggedIn = false;
// console.log(stateClone);

const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone);
stateDeepClone.user.loggedIn = false;

console.log(state);

// only for parcel--
// add changes automatically, but not reload the page
if (module.hot) {
    module.hot.accept()
}
//--


class Person {
    #greeting = 'Hey'
    constructor(name) {
        this.name = name;
        console.log(`${this.#greeting}, ${this.name}`);
    }
}
const jonas = new Person('Jonas');

console.log(jonas ?? null);

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('test').then(x => console.log(x));

import 'core-js/stable';

// Polifilling async functions
import 'regenerator-runtime/runtime';
