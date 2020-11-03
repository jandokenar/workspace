import readline from "readline-sync";
import * as fs from "fs";

// const express = require("express");
// const bodyParser = require("body-parser");

import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`METHOD: ${req.method}`);
    console.log(`PATH: ${req.path}`);
    console.log("BODY: ", req.body);
    console.log(`QUERY: ${req.query}`);
    console.log("----");
    next();
});

console.log("\x1b[32m%s\x1b[33m",
    "°º¤ø,¸¸,ø¤º°`°º¤ø,¸ Roskapankki ,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸");
console.log("");
console.log("Welcome to Roskapankki™ banking CLI! Type help to get help!");
console.log("");

const menu = `I’m glad to help you :) Here’s a list of commands you can use!

ACCOUNTS:

create_account -- > Opens dialog for creating an account.
close_account -- > Opens a dialog for closing an account.
modify_account -- > Opens a dialog for modifying an account.
does_account_exist -- > Opens a dialog for checking if the account exists.
log_in -- > Opens a dialog for logging in.
logout -- > Opens a dialog for logging out.

FUNDS:

withdraw_funds -- > Opens a dialog for withdrawing funds.
deposit_funds -- > Opens a dialog for depositing funds.
transfer_funds -- > Opens a dialog for transferring funds to another account.

REQUESTS:

request_funds -- > Opens a dialog for requesting another user for funds.
funds_requests -- > Shows all the requests for the account funds.
accept_fund_request -- > Opens a dialog for accepting a fund request.
`;

let allUsers = [];

const readFile = fs.readFileSync("./users.json", "utf-8");
allUsers = JSON.parse(readFile);

let loginId = -1; // -1 is no user has logged in

const writeUserDB = () => {
    fs.writeFileSync(
        "./users.json",
        JSON.stringify(allUsers),
        (err) => {
            if (err) console.log(err);
        },
    );
};

const generateId = (newUser) => {
    allUsers = [...allUsers, newUser];
};

const createAccount = () => {
    let input = readline.question(`So you want to create a new account!
Let’s start with the easy question. What is your name? : `);

    while (input.length < 3) {
        input = readline.question("Your name must be over 3 characters. Give new name : ");
    }

    const accountName = input;

    input = readline.question(`Hey ${accountName}! It’s create to have you as a client.
How much cash do you want to deposit to get started with your account?
(10€ is the minimum) : `);
    let accountBalance = parseInt(input, 10);

    while (accountBalance < 10 || Number.isNaN(accountBalance)) {
        input = readline.question(`Unfortunately we can’t open an account for such a
small account. Do you have any more cash with you? : `);
        accountBalance = parseInt(input, 10);
    }
    const accountId = allUsers.length + 1;

    input = readline.question(`Great ${accountName}! You now have an account
(ID: ${accountId}) with balances of ${accountBalance}€. We’re happy to have you as a customer, and
we want to ensure that your money is safe with us. Give us a password,
which gives only you the access to  your account : `);

    while (input.length < 5) {
        input = readline.question("Your password must be over 5 characters. Give new poassword : ");
    }

    const accountPass = input;

    const account = {
        name: accountName,
        password: accountPass,
        id: accountId,
        balance: accountBalance,
        fund_requests: [],
    };
    generateId(account);
    writeUserDB();
};

const withdrawFunds = () => {
    let input = readline.question(`Okay, let’s whip up some cash for you from these ones and
zeroes. What is your account ID? : `);

    let userID = parseInt(input, 10) - 1;

    while (userID > allUsers.length || Number.isNaN(userID) || userID < 0) {
        input = readline.question(`Mhmm, unfortunately an account with that ID does not exist.
Try again. : `);
        userID = parseInt(input, 10) - 1;
    }

    input = readline.question(`Okay, we found an account with that ID.
You will need to insert your password so we can validate it’s actually you. : `);

    while (input !== allUsers[userID].password) {
        input = readline.question("Ah, there must by a typo. Try typing it again : ");
    }

    input = readline.question(`Awesome, we validated you ${allUsers[userID].name}
How much money do you want to withdraw? (Current balance: ${allUsers[userID].balance}€)`);
    let withdraw = parseInt(input, 10);

    while (Number.isNaN(withdraw) || withdraw > allUsers[userID].balance || withdraw < 1) {
        input = readline.question(`Unfortunately you don’t have the balance for that.
Let’s try a smaller amount : `);
        withdraw = parseInt(input, 10);
    }
    allUsers[userID].balance -= withdraw;
    console.log(`Awesome, you can now enjoy your ${withdraw}€ in cash!
There’s still ${allUsers[userID].balance}€ in your account, safe with us.`);
    console.log(allUsers[userID]);
    writeUserDB();
};

const transferFunds = () => {
    let input = readline.question(`Okay, let’s slide these binary treats in to someone elses
pockets. Let’s start with your account ID. : `);

    let userID = parseInt(input, 10) - 1;

    while (userID > allUsers.length || Number.isNaN(userID) || userID < 0) {
        input = readline.question(`Mhmm, unfortunately an account with that ID does not exist.
Try again. : `);
        userID = parseInt(input, 10) - 1;
    }

    input = readline.question(`Okay, we found an account with that ID.
You will need to insert your password so we can validate it’s actually you. : `);

    while (input !== allUsers[userID].password) {
        input = readline.question("Ah, there must by a typo. Try typing it again : ");
    }

    input = readline.question(`Awesome, we validated you ${allUsers[userID].name}
How much money do you want to transfer? (Current balance: ${allUsers[userID].balance}€) : `);
    let transfer = parseInt(input, 10);

    while (Number.isNaN(transfer) || transfer > allUsers[userID].balance || transfer < 1) {
        input = readline.question(`Unfortunately you don’t have the balance for that.
Let’s try a smaller amount :`);
        transfer = parseInt(input, 10);
    }

    input = readline.question(`Awesome, we can do that. What is the ID of the account you want to
transfer these funds into? : `);
    let userID2 = parseInt(input, 10) - 1;

    while (userID2 > allUsers.length || Number.isNaN(userID2) || userID2 < 0) {
        input = readline.question(`Mhmm, unfortunately an account with that ID does not exist.
Try again. : `);
        userID2 = parseInt(input, 10) - 1;
    }

    allUsers[userID].balance -= transfer;
    allUsers[userID2].balance += transfer;
    console.log(`Awesome. We sent ${transfer}€ in cash! to an account with the ID of
 ${userID2}.`);
    writeUserDB();
};

const depositFunds = () => {
    let input = readline.question(`Okay, let’s convert your cash in to some delicious ones and 
zeroes, then feed them in to your hungry system. What is your account ID : `);

    let userID = parseInt(input, 10) - 1;

    while (userID > allUsers.length || Number.isNaN(userID) || userID < 0) {
        input = readline.question(`Mhmm, unfortunately an account with that ID does not exist.
Try again. : `);
        userID = parseInt(input, 10) - 1;
    }

    input = readline.question(`Okay, we found an account with that ID.
You will need to insert your password so we can validate it’s actually you. : `);

    while (input !== allUsers[userID].password) {
        input = readline.question("Ah, there must by a typo. Try typing it again : ");
    }

    input = readline.question(`Awesome, we validated you ${allUsers[userID].name}
How much money do you want to deposit? (Current balance: ${allUsers[userID].balance}€) : `);
    const deposit = parseInt(input, 10);
    if (!Number.isNaN(deposit) && deposit > 0) {
        allUsers[userID].balance += deposit;
        console.log(`Awesome, we removed ${deposit}€ from existence and
stored them in to our system. Now your accounts balance is ${allUsers[userID].balance}€.`);
    }
    writeUserDB();
};

const doesAccountExist = () => {
    const input = readline.question(`Mhmm, you want to check if an account with an ID exists.
Let’s do it! Give us the ID and we’ll check. : `);

    const userID = parseInt(input, 10) - 1;

    if (userID >= allUsers.length || Number.isNaN(userID) || userID < 0) {
        console.log(`Mhmm, unfortunately an account with that ID does not exist.
Try again.`);
    } else {
        console.log(`Awesome! This account actually exists. You should confirm with
the owner that this account is actually his.`);
    }
};

const modifyAccount = () => {
    let input = readline.question(`Mhmm, you want to modify an accounts stored holder name.
We can definitely do that! Let’s start validating you with your ID! : `);

    let userID = parseInt(input, 10) - 1;

    while (userID > allUsers.length || Number.isNaN(userID) || userID < 0) {
        input = readline.question(`Mhmm, unfortunately an account with that ID does not exist.
Try again. : `);
        userID = parseInt(input, 10) - 1;
    }

    input = readline.question(`Okay, we found an account with that ID.
You will need to insert your password so we can validate it’s actually you. : `);

    while (input !== allUsers[userID].password) {
        input = readline.question("Ah, there must by a typo. Try typing it again : ");
    }

    input = readline.question(`Awesome, we validated you ${allUsers[userID].name}
What is the new name for the account holder? : `);

    while (input === allUsers[userID].name) {
        input = readline.question(`Mhmm, I’m quite sure this is the same name.
Try typing it out again. : `);
    }
    allUsers[userID].name = input;
    console.log("Ah, there we go. We will address you as Rene Orozs from now on.");
    writeUserDB();
};

const loginAccount = () => {
    let input = readline.question("So you want to log in? Give us your ID. :");

    let userID = parseInt(input, 10) - 1;

    while (userID > allUsers.length || Number.isNaN(userID) || userID < 0) {
        input = readline.question(`Mhmm, unfortunately an account with that ID does not exist.
Try again. : `);
        userID = parseInt(input, 10) - 1;
    }

    input = readline.question(`Okay, we found an account with that ID.
You will need to insert your password so we can validate it’s actually you. : `);

    while (input !== allUsers[userID].password) {
        input = readline.question("Ah, there must by a typo. Try typing it again : ");
    }

    console.log(`Awesome, we validated you ${allUsers[userID].name}.
You are now logged in.`);
    loginId = userID;
};

const logoutAccount = () => {
    if (loginId >= 0) {
        const input = readline.question("Are you sure you wish to logout? (yes/no) : ");
        if (input === "yes") {
            console.log(`User ${allUsers[loginId].name} has logged out.`);
            loginId = -1;
        }
    } else {
        console.log("No user is currently logged in");
    }
};

const requestFunds = () => {
    if (loginId >= 0) {
        let input = readline.question(
            "So you want request funds from someone? Give us their ID : ",
        );

        let userID = parseInt(input, 10) - 1;

        while (userID > allUsers.lengthreq || Number.isNaN(userID) || userID < 0) {
            input = readline.question(`Mhmm, unfortunately an account with that ID does not exist.
        Try again. : `);
            userID = parseInt(input, 10) - 1;
        }

        input = readline.question(`Okay, we found an account with that ID. 
How much money do you want to request? : `);
        input = parseInt(input, 10);
        if (Number.isNaN(input) || input > 0) {
            console.log(`Awesome! We’ll request that amount from the user with ${userID}.`);
            let funds = allUsers[userID].fund_requests;
            const fundReq = {
                reqid: loginId,
                amount: input,
            };
            funds = [...funds, fundReq];
            allUsers[userID].fund_requests = funds;
            writeUserDB();
        }
    } else {
        console.log("Log in to transfer funds.");
    }
};

const checkFundReq = () => {
    if (loginId >= 0) {
        let userID = 0;
        if (allUsers[loginId].fund_requests.length > 0) {
            allUsers[loginId].fund_requests.forEach((element) => {
                userID = element.reqid + 1; // convert reqId to userID
                console.log(`${element.amount} for user with ID ${userID}`);
            });
        } else {
            console.log("No fund requests found.");
        }
    } else {
        console.log("Log in to check funds.");
    }
};

const acceptFundReq = () => {
    if (loginId >= 0) {
        let userID = 0;
        allUsers[loginId].fund_requests.forEach((element) => {
            userID = element.reqid + 1; // convert reqId to userID
            const input = readline.question(`Okay, we found a request for your funds of
${element.amount} euros for user with ID ${userID} Type yes to accept this request. : `);

            if (input === "yes") {
                console.log(`Good! Now these funds has been transferred to the account,
with ID ${userID}`);

                if (allUsers[loginId].balance >= element.amount) {
                    allUsers[loginId].balance -= element.amount;
                    allUsers[userID - 1].balance += element.amount;
                } else {
                    console.log("Fund request was rejected. Not enough funds.");
                }
            } else {
                console.log("Fund request was rejected.");
            }
        });
        allUsers[loginId].fund_requests = []; // tyhjennä requestit
        writeUserDB();
    } else {
        console.log("Log in to transfer funds.");
    }
};

let inMenus = false; // disable menus for week2

while (inMenus) {
    const input = readline.question("Please enter a command : ");

    switch (input) {
    case "help":
        console.log(menu);
        break;
    case "exit":
        writeUserDB();
        inMenus = false;
        break;
    case "create_account":
        createAccount();
        break;
    case "withdraw_funds":
        withdrawFunds();
        break;
    case "deposit_funds":
        depositFunds();
        break;
    case "transfer_funds":
        transferFunds();
        break;
    case "does_account_exist":
        doesAccountExist();
        break;
    case "modify_account":
        modifyAccount();
        break;
    case "log_in":
        loginAccount();
        break;
    case "logout":
        logoutAccount();
        break;
    case "request_funds":
        requestFunds();
        break;
    case "funds_requests":
        checkFundReq();
        break;
    case "accept_fund_request":
        acceptFundReq();
        break;
    /*  case "debug":
        console.log(allUsers);
        console.log("\x1b[32m%s\x1b[33m",
            "°º¤ø,¸¸,ø¤º°`°º¤ø,¸ Roskapankki ,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸");
        break; */
    default:
        console.log("Unknown command. Please try again.");
    }
}

// WEEK 2 REST API

app.post("/bank/:user", (req, res) => {
    const newUser = {
        name: req.params.user,
        password: req.body.password,
        id: allUsers.length + 1,
        balance: req.body.deposit,
        fund_requests: [],
    };

    allUsers = [...allUsers, newUser];

    // console.log(allUsers);
    writeUserDB();
    res.json(newUser);
});

app.get("/bank/:id/balance", (req, res) => {
    const userID = parseInt(req.params.id, 10);
    const account = allUsers[userID - 1];
    if (account && account.password === req.body.password) {
        res.json(`This account balance is ${account.balance}€.`);
    } else {
        res.status(404).end();
    }
});

app.put("/bank/:id/withdraw", (req, res) => {
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
    writeUserDB();
});

app.put("/bank/:id/deposit", (req, res) => {
    const userID = parseInt(req.params.id, 10);
    const account = allUsers[userID - 1];
    const deposit = parseInt(req.body.amount, 10);
    if (account && account.password === req.body.password && deposit > 0) {
        account.balance += deposit;
        res.json(`This account new balance is ${account.balance}€.`);
    } else {
        res.status(404).end();
    }
    writeUserDB();
});

app.put("/bank/:id/transfer", (req, res) => {
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
    writeUserDB();
});

app.put("/bank/:id/name", (req, res) => {
    const userID = parseInt(req.params.id, 10);
    const newName = req.body.new_name;
    const account = allUsers[userID - 1];
    if (account && account.password === req.body.password && newName !== account.name) {
        account.name = newName;
        res.json(`This account new name is ${account.name}.`);
        writeUserDB();
    } else {
        res.status(404).end();
    }
});

app.put("/bank/:id/password", (req, res) => {
    const userID = parseInt(req.params.id, 10);
    const newPass = req.body.new_password;
    const account = allUsers[userID - 1];
    if (account && account.password === req.body.password && newPass !== account.password) {
        account.password = newPass;
        res.json(`This account new password is ${account.password}.`);
        writeUserDB();
    } else {
        res.status(404).end();
    }
});

app.listen(5000);
