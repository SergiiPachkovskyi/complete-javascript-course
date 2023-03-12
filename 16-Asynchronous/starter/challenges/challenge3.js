'use strict';

const mainContainer = document.querySelector('.images');

const wait = function(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

const createImage = async function(imgPath) {
    return new Promise(function(resolve, reject) {
        const el = document.createElement('img');
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

//Part 1
let img;

const loadNPause = async function() {
    try {
        // Load img 1
        img = await createImage('../img/img-1.jpg');
        await wait(2)
        el.hidden = true;

        // Load img 2
        img = await createImage('../img/img-2.jpg');
        await wait(2)
        el.hidden = true;

        // Load img 3
        img = await createImage('../img/img-3.jpg');
        await wait(2)
        el.hidden = true;
    } catch(err) {
        console.log(err);
    }
}

// loadNPause();

// Part 2
const loadAll = async function(imgArr) {
    try{
        const imgs = imgArr.map(async img => await createImage(img))
        console.log(imgs);
        const imgsEl = await Promise.all(imgs);
        console.log(imgsEl);
        imgsEl.forEach(img => img.classList.add('parallel'))
    } catch(err) {
        console.log(err);
    }
}

loadAll([
    '../img/img-1.jpg',
    '../img/img-2.jpg',
    '../img/img-3.jpg',
]);