const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ask user for the anme input
rl.question(`number 1 `, (number1) => {

    // ask for nationality
    rl.question(`number 2 `, (number2) => {

        // log user details
        console.log('sum of two numbers '+(parseInt(number1)+parseInt(number2)));
        console.log('difference of two numbers '+(parseInt(number1)-parseInt(number2)));
        console.log('fractions of two numbers '+(parseInt(number1)/parseInt(number2)));
        console.log('average of two numbers '+(parseInt(number1)+parseInt(number2))/2);
        
        // close the stream
        rl.close();
    });

});