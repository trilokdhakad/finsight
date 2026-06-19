import { Router } from "express";

import {
    createTransaction,
    getTransactions
} from "../controllers/transaction.controller";

import { validate } from "../middlewares/validate";

import {
    createTransactionSchema
} from "../validators/transaction.schema";

import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post(
    "/",
    authenticate,
    validate(createTransactionSchema),
    createTransaction
);

router.get(
    "/",
    authenticate,
    getTransactions
);

export default router;