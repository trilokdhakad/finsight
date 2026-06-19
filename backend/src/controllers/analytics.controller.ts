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

export const getCategoryBreakdown = async (
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
                },
                include: {
                    category: true
                }
            });

        const breakdown: Record<string, number> = {};

        transactions.forEach((transaction: any) => {

            const categoryName =
                transaction.category.name;

            const amount =
                Number(transaction.amount);

            breakdown[categoryName] =
                (breakdown[categoryName] || 0)
                + amount;
        });

        const result =
            Object.entries(breakdown).map(
                ([category, amount]) => ({
                    category,
                    amount
                })
            );

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        next(error);
    }
};

export const getMonthlyTrend = async (
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

        const monthlyData: Record<
            string,
            {
                income: number;
                expenses: number;
            }
        > = {};

        transactions.forEach((transaction) => {

            const month =
                transaction.transactionDate
                    .toISOString()
                    .slice(0, 7);

            if (!monthlyData[month]) {

                monthlyData[month] = {
                    income: 0,
                    expenses: 0
                };
            }

            const amount =
                Number(transaction.amount);

            if (transaction.type === "INCOME") {

                monthlyData[month].income += amount;

            } else {

                monthlyData[month].expenses += amount;
            }
        });

        const result =
            Object.entries(monthlyData)
                .map(
                    ([month, values]) => ({
                        month,
                        income: values.income,
                        expenses: values.expenses
                    })
                )
                .sort(
                    (a, b) =>
                        a.month.localeCompare(
                            b.month
                        )
                );

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        next(error);
    }
};