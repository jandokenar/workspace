import express from "express";
import mongoose from "mongoose";
import studentRouter from "./routes/studentrouter.js";

const requestLogger = (req, res, next) => {
    console.log(`METHOD: ${req.method}`);
    console.log(`PATH: ${req.path}`);
    console.log("BODY: ", req.body);
    console.log("-----");
    next();
};

const app = express();
const mongoUrl = "mongodb://localhost:27017/studentdb";

const connectMongoose = async () => {
    await mongoose.connect(
        mongoUrl,
        { useNewUrlParser: true, useUnifiedTopology: true },
    );
};

connectMongoose();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("test, hello");
});

app.use(requestLogger);
app.use("/students/", studentRouter);

app.listen(5000, () => {
    console.log("listening to port 5000");
});
