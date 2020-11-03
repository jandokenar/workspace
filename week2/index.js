const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const students = [];

app.post("/student", (req, res) => {
    res.send("thanks for your data! hehe");
    /*
    students.name = req.body.name;
    students.id = req.body.id;
    students.email = req.body.email;
    */

    students[req.body.id] = req.body;

    console.log(students);
});

app.get("/student/:id", (req, res) => {
    if (req.params.id) {
        const userId = parseInt(req.params.id, 10);
        console.log(userId);
        if (students[userId]) {
            console.log(students[userId]);
            res.send(`
Name: ${students[userId].name}<br>
ID: ${students[userId].id}<br>
Email: ${students[userId].email}<br>
`);
            // res.json(students[userId]);
        } else {
            res.send("User not found");
        }
    }
});

app.listen(5000);
