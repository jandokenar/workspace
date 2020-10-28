const n = parseInt(process.argv[2]);

if(!n){
    console.log("please give one number");
    process.exit(1);
}

let c ="&";
for(let i = 0; i < n; i++) {
    console.log(c);
    c = c+"&";
}
