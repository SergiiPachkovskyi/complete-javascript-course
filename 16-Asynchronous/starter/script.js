'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


const renderError = function(message) {
    countriesContainer.insertAdjacentText('beforeend', message);
    countriesContainer.style.opacity = 1;
}

const renderCountry = function(data, classname = '') {
    const html = `
    <article class="country ${classname}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
        </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}


///////////////////////////////////////


// const getCountryAndNeighbour = function(country) {
//     // AJAX call country 1
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load', function() {
//         const [data] = JSON.parse(this.responseText)
//         console.log(data);
        
//         // Render country
//         renderCountry(data);

//         // Get neighbour country (2)
//         const [neighbour] = data.borders;

//         if (!neighbour) return;

//         // AJAX call country 2
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//         request2.send();

//         request2.addEventListener('load', function() {
//             const data2 = JSON.parse(this.responseText)
//             console.log(data2);

//             renderCountry(data2, 'neighbour');
//         })
//     })
// }

// // getCountryAndNeighbour('Ukraine');
 
// /////
// // const request2 = new XMLHttpRequest();
// // request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
// // request2.send();

const getJSON = function(url, errorMessage = 'Something went wrong') {
    return fetch(url).then(response => {
        if (!response.ok) throw new Error(`${errorMessage} (${response.status})`);
        return response.json();
    });
}

// // const getCountryData = function(country) {
// //     fetch(`https://restcountries.com/v2/name/${country}`)
// //         .then(
// //             response => {
// //                 console.log(response);

// //                 if (!response.ok) throw new Error(`Country not found (${response.status})`);
                
// //                 return response.json();
// //             }
// //         )
// //         .then(data => {
// //             renderCountry(data[0]);
// //             // const neighbour = data[0].borders[0];
// //             const neighbour = 'asd';
// //             if (!neighbour) return;

// //             // Country 2
// //             return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)       
// //         })
// //         .then(
// //             response => response.json()
// //         )
// //         .then(data => renderCountry(data, 'neighbour'))
// //         .catch(err => {
// //             console.error(err);
// //             renderError(err.message);
// //         })
// //         .finally(() => {
// //             countriesContainer.style.opacity = 1;
// //         })
// // }

// const getCountryData = function(country) {
//     // Country 1
//     getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
//         .then(data => {
//             renderCountry(data[0]);
//             try {
//                 const neighbour = data[0].borders[0];
//                 // Country 2
//                 return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, 'Country not found');      
//             }
//             catch {
//                 throw new Error('No neifhbour found!');
//             } 
//         })
//         .then(data => renderCountry(data, 'neighbour'))
//         .catch(err => {
//             console.error(err);
//             renderError(err.message);
//         })
//         .finally(() => {
//             countriesContainer.style.opacity = 1;
//         })
// }

// // btn.addEventListener('click', function() {
// //     getCountryData('australia');
// // });

// // getCountryData('vacanda');


// /////////////////////////////
// // console.log('Test start');
// // setTimeout(() => console.log('0 sec timer'), 0);
// // Promise.resolve('Resolved promise 1').then(res => console.log(res));
// // Promise.resolve('Resolved promise 2').then(res => {
// //     for (let i = 0; i < 1000000000; i++) {}   
// //     console.log(res)
// // });
// // console.log('Test end');


// // Creating promise
// const lotteryPromise = new Promise(function(resolve, reject) {
//     console.log('Lottery draw is happening!');
//     setTimeout(function() {
//         if (Math.random() >= 0.5) {
//             resolve('You WIN!');
//         } else {
//             reject(new Error('You LOST!'));
//         }
//     }, 2000)
// })

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying setTimeout
// const wait = function(seconds) {
//     return new Promise(resolve => setTimeout(resolve, seconds * 1000));
// }

// // wait(3)
// //     .then(() => {
// //         console.log('end 1')
// //         return wait(1);
// //     })
// //     .then(() => {
// //         console.log('end 2')
// //         return wait(2);
// //     })
// //     .then(() => {
// //         console.log('end 3')
// //     });

// Promise.resolve('asd').then(x => console.log(x));    
// Promise.reject(new Error('error')).catch(x => console.error(x)); 


// /////////////
// const getPosition_ = function() {
//     return new Promise(function(resolve, reject) {
//         // navigator.geolocation.getCurrentPosition(
//         //     position => resolve(position),
//         //     err => reject(err)
//         // )
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     })
// }

// getPosition_().then(pos => console.log(pos))

// const whereAmI_ = function() {
//     getPosition(_).then(pos => {
//         const {latitude: lat, longitude: lng} = pos.coords;
//         return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=109492698885691e15875492x99143`)
//     }).then(response => {
//         if (!response.ok) throw new Error(`Too many requests per second (${response.status})`);
//         return response.json();
//     })
//     .then(data => {
//         console.log(`You are in ${data.city}, ${data.country}`);  
//         getCountryData(data.country);   
//     })
//     .catch(err => {
//         console.error(err);
//     })
// }

// btn.addEventListener('click', whereAmI_);


// Async/Await
const getPosition = function() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

const whereAmI = async function() {
    try {
        // Geolocation
        const pos = await getPosition();
        const {latitude: lat, longitude: lng} = pos.coords;
        
        // Reverse geocoding
        const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=109492698885691e15875492x99143`);
        if (!resGeo.ok) throw new Error('Problem getting location data')
        const dataGeo = await resGeo.json();
        
        // Country data
        // fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res))
        // the same/synthetic sugar
        const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);
        if (!res.ok) throw new Error('Problem getting country')
        const data = await res.json();
        renderCountry(data[0]);

        return `You are in ${dataGeo.city}, ${dataGeo.country}` 
    } catch (err) {
        console.error(err);
        renderError(err);

        // Reject promis returned from async function
        throw err;
    }
}

console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);

// Old
// whereAmI()
//     .then(city => console.log(city))
//     .catch(err => console
//     .error(`${err.message}`))
//     .finally(() => console.log('3: Finish getting location'))

// // New
// (async function() {
//     try {
//         const city = await whereAmI();
//         console.log(city);
//     } catch(err) {
//         console.error(`${err.message}`);
//     }
//     console.log('3: Finish getting location');
// }) ();


// Running Promises in Parallel
const get3Countries = async function(c1, c2, c3) {
    try {
        // sequence
        // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
        // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
        // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
        // console.log(data1.capital, data2.capital, data3.capital);

        // parallel
       const data = await Promise.all([
            getJSON(`https://restcountries.com/v2/name/${c1}`),
            getJSON(`https://restcountries.com/v2/name/${c2}`),
            getJSON(`https://restcountries.com/v2/name/${c3}`)
       ]);
        console.log(data.map(d => d[0].capital));
    } catch(err) {
        console.error(err);
    }
}

get3Countries('ukraine', 'poland', 'tanzania');


// Promis.race
(async function() {
    // get only one result
    const res = await Promise.race([
        getJSON(`https://restcountries.com/v2/name/egypt`),
        getJSON(`https://restcountries.com/v2/name/poland`),
    ]);
    console.log(res[0]);
})()

const timeout = function(sec) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error('Request took too long!')) 
        }, sec * 1000)
    })
}

Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    timeout(0.1)
])
    .then(res => console.log(res[0]))
    .catch(err => console.error(err));


// Promise.allSettled
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another success')
]).then(res => console.log(res))


// Promise.any [ES2021]
Promise.any([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another success')
]).then(res => console.log(res))
