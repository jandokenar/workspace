/*
If/else

Create a program that takes in two numbers a and b from the command line
Print out "a is greater" if a is bigger than b, and vice versa, and they are equal if they are equal
Modify program to take in a third string argument c, and print out "yay, you guessed the password", if a
and b are equal AND c is "hello world"
*/

//first parameter
const a = parseInt(process.argv[2]);

//second parameter
const b = parseInt(process.argv[3]);
const c = process.argv[4];

if(a>b){
    console.log("a is greater");
} else if(b>a){
    console.log("b is greater");
} else if(a===b) {
    console.log("they are equal"); 
    if(c==="hello world"){
        console.log("yay, you guessed the password");
    }
}
