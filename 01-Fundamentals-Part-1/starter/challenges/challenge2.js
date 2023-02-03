// data 1
const weightMark = 78;
const heightMark = 1.69;

const weightJohn = 92;
const heightJohn = 1.95;

const markBMI = weightMark / heightMark ** 2
const johnBMI = weightJohn / heightJohn ** 2

markHigherBMI = markBMI > johnBMI

if (markHigherBMI) {
    console.log(`${mark.fullName}'s BMI ${markBMI} is higher than ${john.fullName}'s ${johnBMI}!`);
} else {
    console.log(`${john.fullName}'s BMI ${johnBMI} is higher than ${mark.fullName}'s ${markBMI}!`);
}
