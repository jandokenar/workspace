const n = parseInt(process.argv[2]);
let c ="&";
for(let i = 0; i < n; i++) {
    console.log(c);
    c = c+"&";
}
