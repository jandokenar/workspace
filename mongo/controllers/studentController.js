import StudentModel from "../models/studentModel.js";

export const newStudent = async (req, res) => {
    const { name, id } = req.body;
    const student = {
        name,
        id,
    };
    const studentData = new StudentModel(student);
    await studentData.save();
    res.json(student);
};

export const getStudent = async (req, res) => {
    const student = await StudentModel.findOne({ id: req.params.id });
    if (student) {
        res.json(student);
    } else {
        res.status(404).end();
    }
};

export const updateStudent = async (req, res) => {
    const student = await StudentModel.findOne({ id: req.params.id });
    if (student) {
        student.name = req.body.name;
        await student.save();
        res.json(student);
    } else {
        res.status(404).end();
    }
};

export const deleteStudent = async (req, res) => {
    const student = await StudentModel.findOneAndDelete({ id: req.params.id }).exec();
    if (student) {
        // await student.deleteMany();
        res.json(student);
    } else {
        res.status(404).end();
    }
};
