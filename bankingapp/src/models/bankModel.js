import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
    name: String,
    password: String,
    id: Number,
    balance: Number,
    fund_requests: Array,
});

const BankModel = mongoose.model(
    "account", bankSchema,
);

export default BankModel;
