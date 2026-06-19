import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { ApiError } from "../errors/ApiError";
import { Transaction } from "@prisma/client";


const TEST_USER_EMAIL = "test@example.com";

export const getSummary = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const user = await prisma.user.findUnique({
            where: {
                email: TEST_USER_EMAIL
            }
        });

        if (!user) {
            throw new ApiError(
                404,
                "User not found"
            );
        }

        const transactions =
            await prisma.transaction.findMany({
                where: {
                    userId: user.id
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