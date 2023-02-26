const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1. +
dogs.forEach(dog => dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28));

console.log(dogs);


// 2. +-
const sarah = dogs.find(acc => acc.owners.includes('Sarah'));
if (sarah.curFood > sarah.recommendedFood * 1.1) {
    console.log('Sarah dog is eating too much');
} else if (sarah.curFood < dosarahg.recommendedFood * 0.9) {
    console.log('Sarah dog is too little');
}


// 3. +-
const eatTooMuchDogs = dogs.filter(cur => cur.curFood > cur.recommendedFood * 1.1).flatMap(dog => dog.owners);
const eatTooLittleDogs = dogs.filter(cur => cur.curFood < cur.recommendedFood * 0.9).flatMap(dog => dog.owners);

console.log(eatTooMuchDogs);
console.log(eatTooLittleDogs);


// 4. +-
// owners1 = eatTooMuchDogs.map(cur => cur.owners.join(' and ')).join(' and ')
// console.log(`${owners1}'s dogs eat too much!`);
// owners2 = eatTooLittleDogs.map(cur => cur.owners.join(' and ')).join(' and ')
// console.log(`${owners2}'s dogs eat too little!`);
owners1 = eatTooMuchDogs.join(' and ')
console.log(`${owners1}'s dogs eat too much!`);
owners2 = eatTooLittleDogs.join(' and ')
console.log(`${owners2}'s dogs eat too little!`);

// 5. +
console.log(dogs.some(cur => cur.curFood === cur.recommendedFood));

// 6. +-
const isEatingNormal = (dog) =>
    dog.ccurFood / 100 > (dog.recommendedFood * 0.9) && dog.ccurFood / 100 < (dog.recommendedFood *1.1)

console.log(dogs.some(isEatingNormal));

// 7. +-
const eatingNormalDogs = dogs.filter(isEatingNormal)
console.log(eatingNormalDogs);

// 8. +
console.log(dogs.slice(0).sort((a, b) => a.recommendedFood - b.recommendedFood));
console.log(dogs);
