const express = require("express");
const bodyparser = require("body-parser");

const app = express();

let counter = 0;
/*
const user = {
    "matti": 1,
    "tommi" :2
}*/

const counterObject = {};

app.get("/counter/:name", (req, res) => {

    if (req.params.name){
        if (counterObject[req.params.name]){
            counterObject[req.params.name] += 1;
        } else{
            counterObject[req.params.name] = 1;
        }

        let retString = "";
        Object.keys(counterObject).forEach((key) =>{
            retString += `${key} was here ${counterObject[key]} times \n`;
        });
        //names[req.query.name] += 1;
        //console.log(names);
        res.send(retString);
    } else if (req.query.number){
        counter = parseInt(req.query.number, 10);
    } else {
        counter += 1;
    }
    //res.send(`<h1>Counter: ${counter}</h1>`);
})

app.post("", (req,res) => {
    console.log(req.body);
})

app.listen(5000);