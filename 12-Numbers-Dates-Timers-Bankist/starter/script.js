'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-04-10T14:43:26.374Z',
    '2023-02-25T18:49:59.371Z',
    '2023-02-26T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'uk-UA', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2023-02-25T18:49:59.371Z',
    '2023-02-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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


const formatMovementsDate = function(date, locale) {
  const calcDaysPast = (date1, date2) => Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPast = calcDaysPast(new Date(), date);

  if (daysPast === 0) return 'Today';
  if (daysPast === 1) return 'Yesterday';
  if (daysPast <= 7) return `${daysPast} days ago`;
  
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
}

const formatCurr = function(value, local, currency) {
  return Intl.NumberFormat(local,
    {
      style: 'currency',
      currency: currency,
    }).format(value);
}

const displayMovements = function(acc, sort = false) {
  containerMovements.innerHTML = '';
  
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDate(date, acc.locale);

    const formattedMov = formatCurr(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__dates">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

const calcDisplayBalance = function(acc) {
  acc.balance =  acc.movements.reduce((acc, cur) => acc + cur);
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);
}

const calcDisplaySummery = function(acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0).toFixed(2);

  labelSumIn.textContent = formatCurr(incomes, acc.locale, acc.currency);
  
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0).toFixed(2);

  labelSumOut.textContent = formatCurr(out, acc.locale, acc.currency);

    const interest = acc.movements
      .filter(mov => mov > 0)
      .map(deposit => (deposit * acc.interestRate) / 100)
      .filter(int => int >= 1)
      .reduce((acc, int) => acc + int, 0).toFixed(2);

  labelSumInterest.textContent = formatCurr(interest, acc.locale, acc.currency);
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
  displayMovements(acc);

  //Display balance
  calcDisplayBalance(acc)

  //Display summary
  calcDisplaySummery(acc);
}

const startLogOutTimer = function() {
  const tick = function() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String((time % 60)).padStart(2, 0);
    
    // In each call, print the remaining time to Ui
    labelTimer.textContent = `${min}:${sec}`
    
    //When 0 seconds, stop timer
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    //Descore is
    time--;
  }
  
  // set time to 5 minutes
  let time = 120;

  // Call the timer every seconds
  tick();
  const timer = setInterval(tick, 1000);
  
  return timer;
}

////////////////////////////////////////////////////////////////////////////////////////
// EVENT HANDLERS

let currentAccount, timer;

// // Fake always logged in---------
// currentAccount = account1;
// labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
// // ------------------------------

btnLogin.addEventListener('click', function(e) {
  //Prevent form from submitting
  e.preventDefault()
  
  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);

  if (currentAccount?.pin === +inputLoginPin.value) {
    //Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      // month: 'long',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    const local = navigator.language;
    // labelDate.textContent = new Intl.DateTimeFormat(local, options).format(now);
    // labelDate.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours() + 1}`.padStart(2, 0);
    // const min = `${now.getMinutes() + 1}`.padStart(2, 0);

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();

    // timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();  

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

    // add tansfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    // reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }

})

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function() {
      //Add movement
      currentAccount.movements.push(amount);

      // add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      //Update UI
      updateUI(currentAccount);

      // reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
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
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
})



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

console.log(23 === 23.0);
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

//Conversion
console.log(Number('23'));
console.log(+'23');

//Parsing
console.log(Number.parseInt('30px', 10)); // 10 or 2 (binary)
console.log(Number.parseInt('px30', 10));

console.log(Number.parseInt('   2.5rem' ));
console.log(Number.parseFloat(' 2.5rem'  ));

//Check if value is Nan
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'asd'));
console.log(Number.isNaN(20/0));

// Checkoing if the value is number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(20 / 0));

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23/0));


//MATH
console.log(Math.sqrt(9));
console.log(9 ** (1/2));
console.log(8 ** (1/3));

console.log(Math.max(1, 2, 3));
console.log(Math.min(1, 2, 3));

console.log(Math.PI * Number.parseInt('10px') ** 2);


console.log(Math.trunc(Math.random() * 6 + 1));

const randomInt = (min, max) => Math.floor(Math.random() * (max-min) + 1) + min;

console.log(randomInt(3, 10));


//Rounding
console.log(Math.trunc(23.3));

console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3));
console.log(Math.floor('23.9'));

console.log(+(2.123).toFixed(2));

//Remainder
console.log(5 % 2);
console.log(8 % 3);

console.log(6 % 2); // even
console.log(7 % 2); //odd

const isEven = num => num % 2 === 0;

console.log(isEven(8));


// Numeric separators
const diameter = 287_132_456_490_000;
console.log(diameter);

const price = 345_99
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

console.log(transferFee1, transferFee2);


//Big Int
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

console.log(16565564646456456456546546546546546465456456);
console.log(16565564646456456456546546546546546465456456n);
console.log(BigInt(1656556464645));

console.log(20n > 15);
console.log(typeof 20n);
console.log(20n === 20);
console.log(20n == 20);


//DATE
console.log(new Date());
console.log(new Date('Feb 27 2023 13:56:28'));
console.log('December 24 2015');
console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2023, 11, 2, 13, 58, 55));
console.log(new Date(2023, 11, 32));
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // + 3 days

const future = new Date(2023, 11, 2, 13, 58, 55);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());
console.log(Date.now());

future.setFullYear(2025);
console.log(future);


console.log(+future);

const calcDaysPast = (date1, date2) => (date2 - date1) / (1000 * 60 * 60 * 24);
console.log(calcDaysPast(new Date(2037, 10, 14), new Date(2037, 10, 24)));


const num = 3132165465.23;
const options = {
  style: 'currency', // unit, persent, currency
  // unit: 'celsius',
  currency: 'UAH',
  // useGrouping: false,
}
console.log('US:   ', new Intl.NumberFormat('en-US', options).format(num)); 
console.log('Germany:   ', new Intl.NumberFormat('de-DE', options).format(num)); 
console.log('Browser:   ', new Intl.NumberFormat(navigator.language, options).format(num)); 


// setTimeout
const ingridients = ['olives', 'spinach'];

const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`), 3000, ...ingridients);

console.log('Waiting...');

if (ingridients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
// setInterval(function() {
//   const now = new Date();
//   console.log(now);
// }, 1000);
