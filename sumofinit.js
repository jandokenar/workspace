/*Sum of some ints

Create a program that takes in one number n from the command line
Print the sum of integers from 1 to n, that are also multiples of three and five. (hint: the modulus operator 
will help you with this)
ex if n = 17, we'd sum the numbers 3, 5, 6, 9, 10, 12 and 15
*/

const n = parseInt(process.argv[2]);

let sum = 0;
for(let i = 0; i < n; i++) {
    const i2 = i+1;

    if(i2%3 === 0 || i2%5 === 0){
        sum+=i2;
    }
}
console.log(sum);
