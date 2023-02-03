
const calcAverage = (score1, score2, score3) => {
    return (score1 + score2 + score3) / 3
}

// // data1
// avgDolhins = calcAverage(44, 23, 71);
// avgKoalas = calcAverage(65, 54, 49);

// data2
avgDolhins = calcAverage(85, 54, 41);
avgKoalas = calcAverage(23, 34, 27);

function checkWinner(avgDolhins, avgKoalas) {
    if (avgDolhins > avgKoalas * 2) {
        console.log(`Koalas win (${avgDolhins} vs. ${avgKoalas})`);
    } else if (avgKoalas > avgDolhins * 2) {
        console.log(`Dolhins win (${avgKoalas} vs. ${avgDolhins})`);
    } else {
        console.log('Nobody win!');
    }
}

checkWinner(avgDolhins, avgKoalas);