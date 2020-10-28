//first parameter
const a = parseInt(process.argv[2]);

//second parameter
const b = parseInt(process.argv[3]);

if(a && b){
    console.log('sum of two numbers '+(a+b));
    console.log('difference of two numbers '+(a-b));
    console.log('fractions of two numbers '+(a/b));
    console.log('average of two numbers '+(a+b)/2);
}else{
    console.log("please enter 2 numbers in command line")
}

