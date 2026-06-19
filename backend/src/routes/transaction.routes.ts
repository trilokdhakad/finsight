import { Router } from "express";

import {
    createTransaction,
    getTransactions
} from "../controllers/transaction.controller";

import { validate } from "../middlewares/validate";

import {
    createTransactionSchema
} from "../validators/transaction.schema";

const router = Router();

router.post(
    "/",
    validate(createTransactionSchema),
    createTransaction
);

router.get(
    "/",
    getTransactions
);

export default router;