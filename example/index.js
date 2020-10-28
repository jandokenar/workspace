import * as fs from "fs";
import readline from "readline-sync";

const readFile = fs.readFileSync("./example.json", "utf-8");
let jsonObject = JSON.parse(readFile);

console.log(jsonObject.name);

const newName = readline.question("Give new name: ");
jsonObject ={
    ...jsonObject,
    name: newName,
};

fs.writeFileSync(
    "./example.json",
    JSON.stringify(jsonObject), (err) => {
    //(err) => (parameter) err: any;
   // if(err) console.log(err);
});
