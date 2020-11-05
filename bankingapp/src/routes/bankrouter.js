import express from "express";
import {
    getBalance,
    newAccount,
    /*
    updateStudent,
    deleteStudent,
    */
} from "../controllers/bankController.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello from bank");
});

router.post("/new", newAccount);
router.get("/:id/balance", getBalance);
// router.put("/:id/name", updateStudent);
// router.delete("/:id", deleteStudent);

export default router;
