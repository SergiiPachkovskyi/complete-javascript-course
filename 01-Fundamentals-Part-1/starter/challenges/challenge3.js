/* const dolphinsScore = (96 + 108 + 89) / 3;
const koalasScore = (88 + 91 + 110) / 3; */

/* const dolphinsScore = (97 + 112 + 101) / 3;
const koalasScore = (109 + 95 + 123) / 3; */

const dolphinsScore = (97 + 112 + 80) / 3;
const koalasScore = (109 + 95 + 80) / 3;

if (dolphinsScore > koalasScore && dolphinsScore >= 100) {
    console.log('Winer is Dolphine');
} else if (dolphinsScore < koalasScore && koalasScore >= 100) {
    console.log('Winer is Koala');
} else if (dolphinsScore >= 100 && koalasScore >= 100) {
    console.log('Draw');
}