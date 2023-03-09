'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


const renderError = function(message) {
    countriesContainer.insertAdjacentText('beforeend', message);
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
}

const getJSON = function(url, errorMessage = 'Something went wrong') {
    return fetch(url).then(response => {
        if (!response.ok) throw new Error(`${errorMessage} (${response.status})`);
        return response.json();
    });
}

const getCountryData = function(country) {
    // Country 1
    getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
        .then(data => {
            renderCountry(data[0]);
            try {
                const neighbour = data[0].borders[0];
                // Country 2
                return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, 'Country not found');      
            }
            catch {
                throw new Error('No neifhbour found!');
            } 
        })
        .then(data => renderCountry(data, 'neighbour'))
        .catch(err => {
            console.error(err);
            renderError(err.message);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        })
}

const whereAmI = function(lat, lng) {
    // Country 1
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=109492698885691e15875492x99143 `)
        .then(response => {
            if (!response.ok) throw new Error(`Too many requests per second (${response.status})`);
            return response.json();
        })
        .then(data => {
            console.log(`You are in ${data.city}, ${data.country}`);  
            getCountryData(data.country);   
        })
        .catch(err => {
            console.error(err);
        })
}

btn.addEventListener('click', function() {
    whereAmI(-33.933, 18.474);
});
