/*
Async
Use the following asynchronous function twice to get 2 random values
const getValue = function() {
   return new Promise((res, rej) => {
       setTimeout(() => {
           res({ value: Math.random() });
       }, Math.random() * 1500);
   });
};
console.log() the two resulting values:
console.log(`Value 1 is ${valueOneHere} and value 2 is ${valueTwoHere}`);
Do this exercise twice with both methods, async + await and promise.then()!
*/

const getValue = function() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res({ value: Math.random() });
        }, Math.random() * 1500);
    });
 };

 async function aFunction() {
    const result = await new getValue();
    const result2 = await new getValue();
    console.log("Value 1 is "+result.value+" and value 2 is "+result2.value);
 }

 function bFunctiont(){
    let println = "";
    const result = getValue().then((value) => {
        println = println+"Value 1 is "+println+value.value;
        const result2 = getValue().then((value) => {
            println = println+" and value 2 is "+value.value;
            console.log(println);
        });
    });
 }

 aFunction(); // first method
 bFunctiont(); //second method
