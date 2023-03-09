'use strict';

const mainContainer = document.querySelector('.container');
const el = document.createElement('img');

const wait = function(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

const createImage = function(imgPath) {
    return new Promise(function(resolve, reject) {
        el.src = imgPath;
        el.addEventListener('load', function() {
            el.hidden = false;
            mainContainer.append(el);
            resolve(el);
        });
        el.addEventListener('error', function() {
            reject(new Error('Cant load image!'));
        })
    })
}

// const el = document.createElement('img');
// el.src = '../img/img-1.jpg';
// mainContainer.insertAdjacentElement('beforeEnd', el);

createImage('../img/img-1.jpg')
    .then(_ => wait(2))
    .then(_ => {
        el.hidden = true;
        return createImage('../img/img-2.jpg')
    })
    .then(_ => wait(2))
    .then(_ => {
        el.hidden = true;
        return createImage('../img/img-3.jpg')
    })
    .then(_ => wait(2))
    .then(_ => el.hidden = true)
    .catch(err => console.error(err));

