import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { ApiError } from "../errors/ApiError";
import { Transaction } from "@prisma/client";
import { AuthRequest } from "../types/auth-request";

export const getSummary = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const userId =
            (req as AuthRequest).userId;

        const transactions =
            await prisma.transaction.findMany({
                where: {
                    userId
                }
            });

        let income = 0;
        let expenses = 0;

        transactions.forEach((transaction: Transaction) => {

            const amount =
                Number(transaction.amount);

            if (transaction.type === "INCOME") {
                income += amount;
            } else {
                expenses += amount;
            }
        });

        res.status(200).json({
            success: true,
            data: {
                income,
                expenses,
                balance: income - expenses
            }
        });

    } catch (error) {
        next(error);
    }
};