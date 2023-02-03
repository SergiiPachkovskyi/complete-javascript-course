const printForecast = function (arr) {
  let result = '';
  for (let i = 0; i < arr.length; i++) {
    result += `... ${arr[i]}°C in ${i + 1} days `;
  }
  console.log(result + '...');
};

printForecast([17, 27, 23]);
printForecast([12, 5, -5, 0, 4]);
