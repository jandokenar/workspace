const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];

const filtered = arr.filter(element => (element % 3) === 0);

const another = filtered.map(element => { return element * 2; });

console.log(another);