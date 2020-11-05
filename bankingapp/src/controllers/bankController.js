import BankModel from "../models/bankModel.js";

export const newAccount = async (req, res) => {
    const { name, password, balance } = req.body;
    const bank = {
        name,
        password,
        balance,
    };
    bank.id = await BankModel.countDocuments() + 1; // create new id
    bank.fund_request = [];
    const bankData = new BankModel(bank);
    await bankData.save();
    res.json(bank);
};

export const getBalance = async (req, res) => {
    const account = await BankModel.findOne({ id: req.params.id });
    if (account) {
        if (account.password === req.body.password) {
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
        if (account.password === req.body.password) {
            const withdraw = parseInt(req.body.amount1, 10);
            if (withdraw <= account.balance && withdraw > 0) {
                account.balance -= withdraw;
                res.json(`This account new balance is ${account.balance}€.`);
                await account.save();
            } else {
                res.json("Not enough funds.");
            }
        } else {
            res.json("Invalid password.");
        }
    } else {
        res.status(404).end();
    }
};

export const depositFunds = async (req, res) => {
    const account = await BankModel.findOne({ id: req.params.id });
    if (account) {
        if (account.password === req.body.password) {
            const deposit = parseInt(req.body.amount, 10);
            if (deposit > 0) {
                account.balance += deposit;
                res.json(`This account new balance is ${account.balance}€.`);
                await account.save();
            } else {
                res.json("Deposit must be over 0€");
            }
        } else {
            res.json("Invalid password.");
        }
    } else {
        res.status(404).end();
    }
};

export const transferFunds = async (req, res) => {
    const account = await BankModel.findOne({ id: req.params.id });
    const transferAccount = await BankModel.findOne({ id: req.body.recipient_id });
    if (account && transferAccount) {
        if (account.password === req.body.password) {
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
            res.json("Invalid password.");
        }
    } else {
        res.status(404).end();
    }
};

export const renameAccount = async (req, res) => {
    const account = await BankModel.findOne({ id: req.params.id });
    const newname = req.body.new_name;
    if (account && newname) {
        if (account.password === req.body.password) {
            if (newname !== account.name) {
                account.name = newname;
                await account.save();
                res.json(`This account new name is ${newname}`);
            } else {
                res.json("New name must be different.");
            }
        } else {
            res.json("Invalid password.");
        }
    } else {
        res.status(404).end();
    }
};

export const changePassword = async (req, res) => {
    const account = await BankModel.findOne({ id: req.params.id });
    const newpassword = req.body.new_password;
    if (account && newpassword) {
        if (account.password === req.body.password) {
            if (newpassword !== account.password) {
                account.password = newpassword;
                await account.save();
                res.json(`This account new password is ${account.password}`);
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
