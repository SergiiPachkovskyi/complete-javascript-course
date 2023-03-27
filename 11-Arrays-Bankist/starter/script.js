'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = '';
  
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

const calcDisplayBalance = function(acc) {
  acc.balance =  acc.movements.reduce((acc, cur) => acc + cur);
  labelBalance.textContent = `${acc.balance}€`;
}

const calcDisplaySummery = function(acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}€`;
  
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

    const interest = acc.movements
      .filter(mov => mov > 0)
      .map(deposit => (deposit * acc.interestRate) / 100)
      .filter(int => int >= 1)
      .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
}

const createUserNames = function(accs) {
  accs.forEach(function(acc) {
    acc.userName = acc.owner
    .toLocaleLowerCase()
    .split(' ')
    .map((word => word.at(0)))
    .join('');
  });

}
createUserNames(accounts);

const updateUI = function(acc) {
  //Display movements
  displayMovements(acc.movements);

  //Display balance
  calcDisplayBalance(acc)

  //Display summary
  calcDisplaySummery(acc);
}

//EVENT HANDLERS
let currentAccount;

btnLogin.addEventListener('click', function(e) {
  //Prevent form from submitting
  e.preventDefault()
  
  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);

  if (currentAccount?.pin === +inputLoginPin.value) {
    //Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(acc => acc.userName === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
     amount > 0
     && receiverAccount
     && amount <= currentAccount.balance
     && receiverAccount.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    updateUI(currentAccount);
  }

})

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add movement
    currentAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';

})

btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.userName && +inputClosePin.value === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.userName === currentAccount.userName);
    //.indexOf()
    
    //Delete account
    accounts.splice(index, 1);  
    
    //Hide UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }

  inputCloseUsername.value = inputClosePin.value = '';
})

let sorted = false;

btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));
// console.log(arr.slice()); // shallow copy
// console.log([...arr]); // shallow copy

// // console.log(arr.splice(2));
// arr.splice(-1)
// arr.splice(1, 2)
// console.log(arr);

// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// console.log(letters.join('-'));


//AT method
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

console.log(arr[arr.length-1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('jonas'.at(0));

// FOREACH
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i+1} You deposited ${movement}`);
  } else {
    console.log(`Movement ${i+1} Yoy withdrew ${Math.abs(movement)}`);
  }
}

//You cann't use break in forEach
movements.forEach(function(mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i+1} Yoy deposited ${mov}`);
  } else {
    console.log(`Movement ${i+1} Yoy withdrew ${Math.abs(mov)}`);
  }
  console.log(`Current array ${arr}`);
})

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, arr) {
  console.log(value, key, arr);
})

//Set
const currenciesUnique = new Set(['USD', 'GBP', 'UAH', 'USD']);
console.log(currenciesUnique);

currenciesUnique.forEach(function(value, _, arr) {
  console.log(value, arr);
})


//MAP
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUSD = 1.1;

// const movementsUsd = movements.map((mov) => {
//   return mov * eurToUSD;
// });
const movementsUsd = movements.map(mov => mov * eurToUSD);

console.log(movementsUsd);

const movementsDescriptions = movements.map((mov, i, arr) => {
  if (mov > 0) {
    return `Movement ${i+1} Yoy deposited ${mov}`;
  } else {
    return `Movement ${i+1} Yoy withdrew ${Math.abs(mov)}`;
  }
});

console.log(movementsDescriptions);


//FILTER
const deposits = movements.filter(function(mov) {
  return mov > 0;
})

console.log(deposits);


//REDUCE
console.log(movements);

// const balance = movements.reduce(function(acc, cur, i, arr) {
//   return acc + cur;
// }, 0);

const balance = movements.reduce((acc, cur) => acc + cur);

console.log(balance);

 
//FIND
//find first element
console.log(movements.find(mov => mov < 0));

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);


//SOME AND EVERY
console.log(movements);
console.log(movements.includes(-130));

//some
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

//every
const everyIsDeposits = movements.every(mov => mov > 0);
console.log(everyIsDeposits);


//FLAT AND FLATMAP
const arr1 = [1, 2, 3, [4, 5, 6]];
console.log(arr1.flat());

const arrDeep = [1, 2, 3, [4, 5, [6, 7, 8]]];
console.log(arrDeep.flat(2));

//flat
const overalBalance = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//flatMap
const overalBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);


//SORTING
//strings
const owners = ['Jonas', 'Zach', 'Adam', 'Marta']
console.log(owners.sort());
console.log(owners);

//numbers
console.log(movements);

//return < 0 a, b (keep order)
//return > 0 b, a (switch order)

//ascending
// movements.sort((a, b) => a > b ? 1 : -1)
movements.sort((a, b) => a - b)
console.log(movements);
//discending
// movements.sort((a, b) => a < b ? 1 : -1)
movements.sort((a, b) => b - a)
console.log(movements);


//CREATING ARRAYS
console.log([1, 2, 3]);
console.log(new Array(1, 2, 3));

const x = new Array(7);
console.log(x);
console.log(x.map(() => 5)); // not working

x.fill(1);
console.log(x);
x.fill(2, 3, 5);
console.log(x);

const y = Array.from({length: 7}, () => 1);
console.log(y);
const b = Array.from({length: 7}, (_, i) => i + 1);
console.log(b);
const n = Array.from({length: 100}, (_, i) => Math.round(Math.random() * 100));
console.log(n);

// labelBalance.addEventListener('click', () => {
//   const movementsUI = Array.from(document.querySelectorAll('.movements__value'),
//    el => +el.textContent.replace('€', ''));
//   console.log(movementsUI);
  
//   const movementsUI2 = [...document.querySelectorAll('.movements__value')];
//   console.log(movementsUI);
// })

