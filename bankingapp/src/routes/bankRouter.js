import express from "express";
import {
    getBalance,
    newAccount,
    withdrawFunds,
    depositFunds,
    transferFunds,
    renameAccount,
    changePassword,
    newFundReq,
    getFundReq,
    acceptFundReq,
} from "../controllers/bankController.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello from bank");
});

router.post("/new", newAccount);
router.get("/:id/balance", getBalance);
router.get("/:id/fundreq", getFundReq);
router.put("/:id/withdraw", withdrawFunds);
router.put("/:id/deposit", depositFunds);
router.put("/:id/transfer", transferFunds);
router.put("/:id/name", renameAccount);
router.put("/:id/password", changePassword);
router.put("/:id/newfundreq", newFundReq);
router.put("/:id/acceptreq", acceptFundReq);

export default router;
