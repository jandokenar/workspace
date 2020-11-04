import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: String,
    id: String,
});

const StudentModel = mongoose.model(
    "student", studentSchema,
);

export default StudentModel;
