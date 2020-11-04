import mongoose from "mongoose";

const url = "mongodb://localhost:27017/testdb";

mongoose.connect(url,
    { useNewUrlParser: true, useUnifiedTopology: true });

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: Date,
    important: Boolean,
});

const note = mongoose.model('note', noteSchema);

const newnote = new note({
    title: "epic world",
    content: "hello world",
    date: new Date(),
    important: true,
});

newnote.save().then(resp => {
    console.log("note saved");
    console.log(resp);
    mongoose.connection.close();
});