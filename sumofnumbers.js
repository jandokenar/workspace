const n = parseInt(process.argv[2]);

let sum = [];

for(let i = 0; i < n; i++) {
    sum[i]=i+1;
}

console.log(sum.reduce((a, b) => a + b, 0));