// WEEK 2 REST API
import * as fs from "fs";

import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

// let allUsers = [];

// const readFile = fs.readFileSync("./users.json", "utf-8");
// let allUsers = JSON.parse(readFile);

const writeUserDB = (allUsers) => {
    fs.writeFileSync(
        "./users.json",
        JSON.stringify(allUsers),
        (err) => {
            if (err) console.log(err);
        },
    );
};

const readUserDB = () => {
    const readFile = fs.readFileSync("./users.json", "utf-8");
    const allUsers = JSON.parse(readFile);
    return allUsers;
};

app.use((req, res, next) => {
    console.log(`METHOD: ${req.method}`);
    console.log(`PATH: ${req.path}`);
    console.log("BODY: ", req.body);
    console.log(`QUERY: ${req.query}`);
    console.log("----");
    next();
});

app.post("/bank/:user", (req, res) => {
    let allUsers = readUserDB();
    const newUser = {
        name: req.params.user,
        password: req.body.password,
        id: allUsers.length + 1,
        balance: req.body.deposit,
        fund_requests: [],
    };

    allUsers = [...allUsers, newUser];

    writeUserDB(allUsers);
    res.json(newUser);
});

app.get("/bank/:id/balance", (req, res) => {
    const allUsers = readUserDB();
    const userID = parseInt(req.params.id, 10);
    const account = allUsers[userID - 1];
    if (account && account.password === req.body.password) {
        res.json(`This account balance is ${account.balance}€.`);
    } else {
        res.status(404).end();
    }
});

app.put("/bank/:id/withdraw", (req, res) => {
    const allUsers = readUserDB();
    const userID = parseInt(req.params.id, 10);
    const account = allUsers[userID - 1];
    const withdraw = parseInt(req.body.amount, 10);
    if (account && account.password === req.body.password &&
        withdraw <= account.balance && withdraw > 0) {
        account.balance -= withdraw;
        res.json(`This account new balance is ${account.balance}€.`);
    } else if (withdraw > account.balance) {
        res.json("This account does not have enough balance.");
    } else {
        res.status(404).end();
    }
    writeUserDB(allUsers);
});

app.put("/bank/:id/deposit", (req, res) => {
    const allUsers = readUserDB();
    const userID = parseInt(req.params.id, 10);
    const account = allUsers[userID - 1];
    const deposit = parseInt(req.body.amount, 10);
    if (account && account.password === req.body.password && deposit > 0) {
        account.balance += deposit;
        res.json(`This account new balance is ${account.balance}€.`);
    } else {
        res.status(404).end();
    }
    writeUserDB(allUsers);
});

app.put("/bank/:id/transfer", (req, res) => {
    const allUsers = readUserDB();
    const userID = parseInt(req.params.id, 10);
    const transferID = parseInt(req.body.recipient_id, 10);
    const account = allUsers[userID - 1];
    const transferAccount = allUsers[transferID - 1];
    const transfer = parseInt(req.body.amount, 10);
    if (transferAccount && account && account.password === req.body.password &&
        transfer <= account.balance && transfer > 0) {
        account.balance -= transfer;
        transferAccount.balance += transfer;
        res.json(`${transfer}€ transfered to ID: ${transferAccount.id}. ` +
            `This account new balance is ${account.balance}€.`);
    } else if (transfer > account.balance) {
        res.json("This account does not have enough balance.");
    } else {
        res.status(404).end();
    }
    writeUserDB(allUsers);
});

app.put("/bank/:id/name", (req, res) => {
    const allUsers = readUserDB();
    const userID = parseInt(req.params.id, 10);
    const newName = req.body.new_name;
    const account = allUsers[userID - 1];
    if (account && account.password === req.body.password && newName !== account.name) {
        account.name = newName;
        res.json(`This account new name is ${account.name}.`);
        writeUserDB(allUsers);
    } else {
        res.status(404).end();
    }
});

app.put("/bank/:id/password", (req, res) => {
    const allUsers = readUserDB();
    const userID = parseInt(req.params.id, 10);
    const newPass = req.body.new_password;
    const account = allUsers[userID - 1];
    if (account && account.password === req.body.password && newPass !== account.password) {
        account.password = newPass;
        res.json(`This account new password is ${account.password}.`);
        writeUserDB(allUsers);
    } else {
        res.status(404).end();
    }
});

app.listen(5000);
