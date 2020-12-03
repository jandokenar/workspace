import bcrypt from "bcrypt";
import BankModel from "../models/bankModel.js";

export const newAccount = async (req, res) => {
    const { name, balance } = req.body;
    const bank = {
        name,
        balance,
    };
    bank.password = bcrypt.hashSync(req.body.password, 10);
    bank.id = await BankModel.countDocuments() + 1; // create new id
    bank.fund_request = [];
    const bankData = new BankModel(bank);
    await bankData.save();
    res.json(bank);
};

export const getBalance = async (req, res) => {
    const account = await BankModel.findOne({ id: req.params.id });
    if (account) {
        const isPassMatch = bcrypt.compareSync(req.body.password, account.password);
        if (isPassMatch) {
            res.json(`This account balance is ${account.balance}€.`);
        } else {
            res.json("Invalid password.");
        }
    } else {
        res.status(404).end();
    }
};

export const withdrawFunds = async (req, res) => {
    const account = await BankModel.findOne({ id: req.params.id });
    if (account) {
        // const isPassMatch = bcrypt.compareSync(req.body.password, account.password);
        // if (isPassMatch) {
        const withdraw = parseInt(req.body.amount, 10);
        if (withdraw <= account.balance && withdraw > 0) {
            account.balance -= withdraw;
            res.json(`This account new balance is ${account.balance}€.`);
            await account.save();
        } else {
            res.json("Not enough funds.");
        }
        // } else {
        //    res.json("Invalid password.");
        // }
    } else {
        res.status(404).end();
    }
};

export const depositFunds = async (req, res) => {
    const account = await BankModel.findOne({ id: req.params.id });
    if (account) {
        // const isPassMatch = bcrypt.compareSync(req.body.password, account.password);
        // if (isPassMatch) {
        const deposit = parseInt(req.body.amount, 10);
        if (deposit > 0) {
            account.balance += deposit;
            res.json(`This account new balance is ${account.balance}€.`);
            await account.save();
        } else {
            res.json("Deposit must be over 0€");
        }
        // } else {
        //    res.json("Invalid password.");
        // }
    } else {
        res.status(404).end();
    }
};

export const transferFunds = async (req, res) => {
    const account = await BankModel.findOne({ id: req.params.id });
    const transferAccount = await BankModel.findOne({ id: req.body.recipient_id });
    if (account && transferAccount) {
        // const isPassMatch = bcrypt.compareSync(req.body.password, account.password);
        // if (isPassMatch) {
        if (account.id !== transferAccount.id) {
            const transfer = parseInt(req.body.amount, 10);
            if (transfer <= account.balance && transfer > 0) {
                account.balance -= transfer;
                transferAccount.balance += transfer;
                res.json(`${transfer}€ transfered to ID: ${transferAccount.id}. ` +
                    `This account new balance is ${account.balance}€.`);
                await account.save();
                await transferAccount.save();
            } else {
                res.json("Not enough funds.");
            }
        } else {
            res.json("You cant transfer funds to your own account");
        }
        // } else {
        //     res.json("Invalid password.");
        // }
    } else {
        res.status(404).end();
    }
};

export const renameAccount = async (req, res) => {
    const account = await BankModel.findOne({ id: req.params.id });
    const newname = req.body.new_name;
    if (account && newname) {
        // const isPassMatch = bcrypt.compareSync(req.body.password, account.password);
        // if (isPassMatch) {
        if (newname !== account.name) {
            account.name = newname;
            await account.save();
            res.json(`This account new name is ${newname}`);
        } else {
            res.json("New name must be different.");
        }
        // } else {
        //    res.json("Invalid password.");
        // }
    } else {
        res.status(404).end();
    }
};

export const changePassword = async (req, res) => {
    const account = await BankModel.findOne({ id: req.params.id });
    const newpassword = req.body.new_password;
    if (account && newpassword) {
        const isPassMatch = bcrypt.compareSync(req.body.password, account.password);
        if (isPassMatch) {
            const isNewPassMatch = bcrypt.compareSync(newpassword, account.password);
            if (!isNewPassMatch) {
                account.password = bcrypt.hashSync(newpassword, 10);
                await account.save();
                res.json("Account has a new password.");
            } else {
                res.json("New password must be different.");
            }
        } else {
            res.json("Invalid password.");
        }
    } else {
        res.status(404).end();
    }
};

export const newFundReq = async (req, res) => {
    const account = await BankModel.findOne({ id: req.params.id });
    if (account) {
        const isPassMatch = bcrypt.compareSync(req.body.password, account.password);
        if (isPassMatch) {
            const reqAmount = parseInt(req.body.amount, 10);
            if (reqAmount > 0) {
                const reqAccount = await BankModel.findOne({ id: req.body.recipient_id });
                let funds = reqAccount.fund_requests;
                const fundReq = {
                    reqid: parseInt(req.params.id, 10),
                    amount: reqAmount,
                };
                funds = [...funds, fundReq];
                reqAccount.fund_requests = funds;
                res.json(`new fund req added to: ${req.body.recipient_id}.`);
                await reqAccount.save();
            } else {
                res.json("Transfer request must be over 0€");
            }
        } else {
            res.json("Invalid password.");
        }
    } else {
        res.status(404).end();
    }
};

export const getFundReq = async (req, res) => {
    const account = await BankModel.findOne({ id: req.params.id });
    if (account) {
        const isPassMatch = bcrypt.compareSync(req.body.password, account.password);
        if (isPassMatch) {
            res.json(account.fund_requests);
        } else {
            res.json("Invalid password.");
        }
    } else {
        res.status(404).end();
    }
};

/* ei toimi

export const acceptFundReq = async (req, res) => {
    const account = await BankModel.findOne({ id: req.params.id });
    if (account) {
        const isPassMatch = bcrypt.compareSync(req.body.password, account.password);
        if (isPassMatch) {
            if (account.fund_requests.length > 0) {
                let msg = "";
                let newBalance = account.balance;
                account.fund_requests.forEach(async (element) => {
                    const destAccount = await BankModel.findOne({ id: element.reqid });
                    if (newBalance >= element.amount) {
                        newBalance -= element.amount;
                        destAccount.balance += element.amount;
                        await destAccount.save();
                    } else {
                        msg = "One or more fund request(s) were rejected. Not enough funds. ";
                    }
                });
                account.fund_requests.forEach((element) => { // another non async loop
                    if (account.balance >= element.amount) {
                        account.balance -= element.amount;
                    }
                });
                // account.fund_requests = [];
                await account.save();

                res.json(`${msg}You have made transfers.`);
            } else {
                res.json("You have no fund requests.");
            }
        } else {
            res.json("Invalid password.");
        }
    } else {
        res.status(404).end();
    }
};
*/

// new api command for react no password checks
export const getAccount = async (req, res) => {
    const account = await BankModel.findOne({ id: req.params.id });
    if (account) {
        res.status(200).json(account);
    } else {
        res.status(404).end();
    }
};

/*
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
*/
