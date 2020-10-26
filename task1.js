const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`number 1 `, (number1) => {

    rl.question(`number 2 `, (number2) => {

        console.log('sum of two numbers '+(parseInt(number1)+parseInt(number2)));
        console.log('difference of two numbers '+(parseInt(number1)-parseInt(number2)));
        console.log('fractions of two numbers '+(parseInt(number1)/parseInt(number2)));
        console.log('average of two numbers '+(parseInt(number1)+parseInt(number2))/2);
        
        rl.close();
    });

});