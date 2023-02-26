const dogsAges1 = [5, 2, 4, 1, 15, 8, 3];
const dogsAges2 =  [16, 6, 10, 5, 6, 1, 4];


const calcAverageHumanAge = function(dogsAges) {
    console.log(dogsAges);
    
    const avg = dogsAges
    .map(age => age < 2 ? 2 * age : 16 + age * 4)
    .filter(age => age >= 18)
    .reduce((acc, curr, _, arr) => acc + curr / arr.length, 0);
    console.log(avg);
}

calcAverageHumanAge(dogsAges1);
calcAverageHumanAge(dogsAges2);
