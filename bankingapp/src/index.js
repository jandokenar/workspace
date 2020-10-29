import readline from "readline-sync";
import * as fs from "fs";

console.log("Welcome to Roskapankki™ banking CLI!");
console.log("Type help to get help!");

const menu = `I’m glad to help you :) Here’s a list of commands you can use!
Accounts
create_account -- > Opens dialog for creating an account.
close_account -- > Opens a dialog for closing an account.
modify_account -- > Opens a dialog for modifying an account.
does_account_exist -- > Opens a dialog for checking if the account exists.
log_in -- > Opens a dialog for logging in.
logout -- > Opens a dialog for logging out.
Funds
withdraw_funds -- > Opens a dialog for withdrawing funds.
deposit_funds -- > Opens a dialog for depositing funds.
transfer_funds -- > Opens a dialog for transferring funds to another account.
Requests
request_funds -- > Opens a dialog for requesting another user for funds.
funds_requests -- > Shows all the requests for the account funds.
accept_fund_request -- > Opens a dialog for accepting a fund request.`;

const readFile = fs.readFileSync("./users.json", "utf-8");

const jsonObject = JSON.parse(readFile);
console.log(jsonObject);

/* const writeUser = (newUser) => {
    console.log(newUser.id);

    /*jsonObject = {
        [newUser.id]: newUser,
    };
    jsonObject.push(newUser.id+": "+ newUser);

    fs.writeFileSync(
        "./users.json",
        JSON.stringify(jsonObject),
        (err) => {
            if (err) console.log(err);
        },
    );
}; */
let allUsers = [];

const generateId = (newUser) => {
    // allUsers[allUsers.length] = newObject;
    allUsers = [...allUsers, newUser];
};

const createAccount = () => {
    let input = readline.question(`So you want to create a new account!
Let’s start with the easy question. What is your name?`);

    // input = readline.question("Account name must be over 3 characters");
    while (input.length < 3) {
        input = readline.question("Your name must be over 3 characters. Give new name:");
    }

    const accountName = input;

    input = readline.question(`Hey ${accountName}! It’s create to have you as a client.
How much cash do you want to deposit to get started with your account?
(10€ is the minimum)`);
    let accountBalance = parseInt(input, 10);

    while (accountBalance < 10 || Number.isNaN(accountBalance)) {
        input = readline.question(`Unfortunately we can’t open an account for such a
small account. Do you have any more cash with you?`);
        accountBalance = parseInt(input, 10);
    }
    const accountId = allUsers.length + 1;

    input = readline.question(`Great ${accountName}! You now have an account
(ID: ${accountId}) with balances of ${accountBalance}€. We’re happy to have you as a customer, and
we want to ensure that your money is safe with us. Give
us a password, which gives only you the access to  your account.`);

    while (input.length < 5) {
        input = readline.question("Your password must be over 5 characters. Give new poassword:");
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
    console.log(allUsers);
    // writeUsers(allUsers);
};

// for DEBUG
const createAccountDebug = () => {
    const accountId = allUsers.length + 1;
    const account = {
        name: "Testaaja Teppo",
        password: "passu",
        id: accountId,
        balance: 1000,
        fund_requests: [],
    };
    generateId(account);
    console.log(allUsers);
    // writeUsers(allUsers);
};

createAccountDebug();
createAccountDebug();

// createAccount(); // debug

const withdradFunds = () => {
    let input = readline.question(`Okay, let’s whip up some cash for you from these ones and
zeroes. What is your account ID?`);

    let userID = parseInt(input, 10) - 1;

    while (userID > allUsers.length || Number.isNaN(userID) || userID < 0) {
        input = readline.question(`Mhmm, unfortunately an account with that ID does not exist.
Try again.`);
        userID = parseInt(input, 10) - 1;
    }

    input = readline.question(`Okay, we found an account with that ID.
You will need to insert your password so we can validate it’s actually you.`);

    while (input !== allUsers[userID].password) {
        input = readline.question("Ah, there must by a typo. Try typing it again");
    }

    input = readline.question(`Awesome, we validated you ${allUsers[userID].name}
How much money do you want to withdraw? (Current balance: ${allUsers[userID].balance}€)`);
    let withdraw = parseInt(input, 10);

    while (Number.isNaN(withdraw) || withdraw > allUsers[userID].balance) {
        input = readline.question(`Unfortunately you don’t have the balance for that.
Let’s try a smaller amount`);
        withdraw = parseInt(input, 10);
    }
    allUsers[userID].balance -= withdraw;
    console.log(`Awesome, you can now enjoy your ${withdraw}€ in cash!
There’s still ${allUsers[userID].balance}€ in your account, safe with us.`);
    console.log(allUsers[userID]);
};

const depositFunds = () => {
    let input = readline.question(`Okay, let’s convert your cash in to some delicious ones and 
zeroes, then feed them in to your hungry system. What is your account ID`);

    let userID = parseInt(input, 10) - 1;

    while (userID > allUsers.length || Number.isNaN(userID) || userID < 0) {
        input = readline.question(`Mhmm, unfortunately an account with that ID does not exist.
Try again.`);
        userID = parseInt(input, 10) - 1;
    }

    input = readline.question(`Okay, we found an account with that ID.
You will need to insert your password so we can validate it’s actually you.`);

    while (input !== allUsers[userID].password) {
        input = readline.question("Ah, there must by a typo. Try typing it again");
    }

    input = readline.question(`Awesome, we validated you ${allUsers[userID].name}
How much money do you want to deposit? (Current balance: ${allUsers[userID].balance}€)`);
    const deposit = parseInt(input, 10);
    if (!Number.isNaN(deposit) && deposit > 0) {
        allUsers[userID].balance += deposit;
        console.log(`Awesome, we removed ${deposit}€ from existence and
stored them in to our system. Now your accounts balance is ${allUsers[userID].balance}€.`);
    }

    console.log(allUsers[userID]);
};

// debug
withdradFunds();
depositFunds();

let inMenus = true;

while (inMenus) {
    const input = readline.question("Please enter a command :");

    switch (input) {
    case "help":
        console.log(menu);
        break;
    case "exit":
        inMenus = false;
        break;
    case "create_account":
        createAccount();
        break;
    case "withdraw_funds":
        withdradFunds();
        break;
    case "deposit_funds":
        depositFunds();
        break;
    default:
          // default here
    }
}
