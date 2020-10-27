/*From the elements of this array, create a new array with only the numbers that are divisible by three.
Create a new array from this array, where each number is multiplied by 2
Sum all of the values in the array using the array method reduce


console.log the result after each step*/

const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
console.log(arr);

const filtered = arr.filter(element => (element % 3) === 0);
console.log(filtered);

const another = filtered.map(element => { return element * 2; });
console.log(another);