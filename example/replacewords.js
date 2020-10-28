import { readFile } from "fs";

readFile("./mytext.txt",
    "utf-8",
    (err, file) => {
        if (err) {
            console.log(err);
        } else {
            while (file.includes("World")) {
                // eslint-disable-next-line no-param-reassign
                file = file.replace("World", "perjantai");
            }
            while (file.includes("coding")) {
                file = file.replace("coding", "torille");
            }
            console.log(file);
        }
    });
