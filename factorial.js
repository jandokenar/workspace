const n = parseInt(process.argv[2]);

let fact = [];

for(let i = 0; i < n; i++) {
    fact[i]=i+1;
}

console.log(fact.reduce((a, b) => a * (b == 0 ? 1 : b), 1));
