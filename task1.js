const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ask user for the anme input
rl.question(`Number 1 `, (number1) => {

    // ask for nationality
    rl.question(`Number 2 `, (number2) => {

        // log user details
        console.log('sum of two numbers '+(parseInt(number1)+parseInt(number2)));

        // close the stream
        rl.close();
    });

});