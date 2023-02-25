const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];
// const dogsJulia = [9, 16, 6, 8, 3];
// const dogsKate = [10, 5, 6, 1, 4];

const checkDogs = function(dogsJulia, dogsKate) {
    dogsJuliaWothoutCats = dogsJulia.slice(1, -2);
    console.log(dogsJuliaWothoutCats);
    // allDogs = [...dogsJuliaWothoutCats, ...dogsKate];
    allDogs = dogsJuliaWothoutCats.concat(dogsKate);
    console.log(allDogs);
    allDogs.forEach(function(dog, i) {
        if (dog >= 3) {
            result = `Dog number ${i+1} is an adult, adn is ${dog} years old`;
        } else {
            result = `Dog number ${i+1} is still a puppy`;
        }
        console.log(result);
    });
}

checkDogs(dogsJulia, dogsKate);
