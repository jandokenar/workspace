// requires "type" : "module" in package.json

import readline from "readline-sync";

const answer = readline.question("Tell me something :");
console.log(`your answer ${answer}`);
