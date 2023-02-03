const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    heigh: 1.69,
    calcBMI: function () {
        return this.mass / this.heigh ** 2
    }
}

const john = {
    fullName: 'John Smith',
    mass: 92,
    heigh: 1.95,
    calcBMI: function () {
        return this.mass / this.heigh ** 2
    }
}

const markBMI = mark.calcBMI();
const johnBMI = john.calcBMI();
const markHigherBMI = markBMI > johnBMI;

if (markHigherBMI) {
    console.log(`Mark's BMI ${markBMI} is higher than Jahn's ${johnBMI}!`);
} else {
    console.log(`Jahn's BMI ${johnBMI} is higher than Mark's ${markBMI}!`);
}
