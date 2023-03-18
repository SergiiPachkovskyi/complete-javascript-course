// Exporting module--------------------------------------

console.log('Exporting module');


// console.log('start fetching users');
// const res = await fetch('https://jsonplaceholder.typicode.com/users');
// const data = await res.json();
// console.log(data);
// console.log('finish fetching users');

const shippingCost = 10;
export const cart = [];

export const addToCart = function(product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
}

// Error: export only on top level
// if (true) {
//     export const x = 0;
// }

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

// default export
// export value, NOT variable
export default function(product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
}