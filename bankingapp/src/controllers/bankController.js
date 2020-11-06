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
        // const passwordHash = bcrypt.hashSync('passu', 10);
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
        const isPassMatch = bcrypt.compareSync(req.body.password, account.password);
        if (isPassMatch) {
            const withdraw = parseInt(req.body.amount, 10);
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
        const isPassMatch = bcrypt.compareSync(req.body.password, account.password);
        if (isPassMatch) {
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
        const isPassMatch = bcrypt.compareSync(req.body.password, account.password);
        if (isPassMatch) {
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
        const isPassMatch = bcrypt.compareSync(req.body.password, account.password);
        if (isPassMatch) {
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
