const fs = require("fs"); //import fs module

const variable = "eeppinen teksti 2";

fs.writeFile("./writeFile.txt",
    variable,
    (err) => {
        if (err) {
            console.log(err);
        }else{
            console.log("success")
        }
    });

fs.readFile("./writeFile.txt",
    "utf-8",
    (err, file) => {
        if (err) {
            console.log(err);
        }else{
            console.log(file);
        }
    });