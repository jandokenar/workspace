import readline from "readline-sync";

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
        break;
    default:
          // code block
    }
}
