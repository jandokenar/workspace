const n = parseInt(process.argv[2]);

let sum = 0;

for(let i = 0; i < n; i++) {
    sum += i+1;
}
console.log(sum);