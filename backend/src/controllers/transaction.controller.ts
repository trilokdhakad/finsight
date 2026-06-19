import { Request, Response, NextFunction } from "express";

import { prisma } from "../lib/prisma";
import { ApiError } from "../errors/ApiError";

const TEST_USER_EMAIL = "test@example.com";

export const createTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const {
            amount,
            type,
            categoryId,
            transactionDate,
            description,
            paymentMethod
        } = req.body;

        const user =
            await prisma.user.findUnique({
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

        const category =
            await prisma.category.findFirst({
                where: {
                    id: categoryId,
                    userId: user.id
                }
            });

        if (!category) {
            throw new ApiError(
                404,
                "Category not found"
            );
        }

        const transaction =
            await prisma.transaction.create({
                data: {
                    amount,
                    type,
                    categoryId,
                    transactionDate: new Date(transactionDate),
                    description,
                    paymentMethod,
                    userId: user.id
                }
            });

        res.status(201).json({
            success: true,
            data: transaction
        });

    } catch (error) {
        next(error);
    }
};

export const getTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const user =
            await prisma.user.findUnique({
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
                },
                include: {
                    category: true
                },
                orderBy: {
                    transactionDate: "desc"
                }
            });

        res.status(200).json({
            success: true,
            data: transactions
        });

    } catch (error) {
        next(error);
    }
};