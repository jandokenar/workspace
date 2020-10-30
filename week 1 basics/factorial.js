/*
Create a program that takes in a number n from the command line
Create a function that calculates the factorial n! of this number


ex n! = n * (n-1) * (n-2) * ... * 1
if n=4, factorial n! = 4* 3 * 2 *1
*/

const n = parseInt(process.argv[2]);

if(!n){
    console.log("please give one number");
    process.exit(1);
}

let fact = 0;

for(let i = n; i > 0; i--) {

    if (n > 1){
        fact += (n * (n-i));
    }else{
        fact = 1;
    }

}
console.log(fact);

