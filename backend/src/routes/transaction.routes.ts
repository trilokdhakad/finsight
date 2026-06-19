import { Router } from "express";

import {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction
} from "../controllers/transaction.controller";

import { validate } from "../middlewares/validate";

import {
    createTransactionSchema,
    updateTransactionSchema
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

router.patch(
    "/:id",
    authenticate,
    validate(updateTransactionSchema),
    updateTransaction
);

router.delete(
    "/:id",
    authenticate,
    deleteTransaction
);

export default router;