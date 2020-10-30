import { createWriteStream, createReadStream } from "fs";

const stream = createWriteStream("./writeStream.txt");
stream.write("Epic stream", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("success");
    }
});

const readStream = createReadStream("./writeStream.txt");
readStream.on("data", (txt) => {
    console.log(txt);
});
