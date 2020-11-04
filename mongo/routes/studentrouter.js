import express from "express";
import {
    getStudent,
    newStudent,
    updateStudent,
    deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello from student");
});

router.post("/new", newStudent);
router.get("/:id", getStudent);
router.put("/:id/name", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
