const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. +
for (const [number, player] of game.scored.entries()) console.log(`Goal ${number+1}: ${player}`);

// 2. +
let sum = 0;
for (const odd of Object.values(game.odds)) {
  sum += odd;
}
console.log((sum / Object.values(game.odds).length).toFixed(2));

// 3. +
for (const [key, odd] of Object.entries(game.odds)) {
  game[key] ? console.log(`Odd of victory ${game[key]}: ${odd}`) : console.log(`Odd of draw: ${odd}`);
}

// 4. +
const scorers = {}
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : scorers[player] = 1;
}
console.log(scorers);
