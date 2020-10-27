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
