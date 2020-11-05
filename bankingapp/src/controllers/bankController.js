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

/*
export const updateStudent = async (req, res) => {
    const student = await BankModel.findOne({ id: req.params.id });
    if (student) {
        student.name = req.body.name;
        await student.save();
        res.json(student);
    } else {
        res.status(404).end();
    }
};

export const deleteStudent = async (req, res) => {
    const student = await BankModel.findOneAndDelete({ id: req.params.id }).exec();
    if (student) {
        // await student.deleteMany();
        res.json(student);
    } else {
        res.status(404).end();
    }
};
*/
/*
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
*/
