import { Request, Response, NextFunction } from "express";

import { prisma } from "../lib/prisma";
import { ApiError } from "../errors/ApiError";
import { AuthRequest } from "../types/auth-request";

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

        const userId =
            (req as AuthRequest).userId;

        const category =
            await prisma.category.findFirst({
                where: {
                    id: categoryId,
                    userId
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
                    userId
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

        const userId =
            (req as AuthRequest).userId;

        const transactions =
            await prisma.transaction.findMany({
                where: {
                    userId
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

export const updateTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const userId =
            (req as AuthRequest).userId;

        const id =
            req.params.id as string;

        const existingTransaction =
            await prisma.transaction.findFirst({
                where: {
                    id,
                    userId
                }
            });

        if (!existingTransaction) {
            throw new ApiError(
                404,
                "Transaction not found"
            );
        }

        const updatedTransaction =
            await prisma.transaction.update({
                where: {
                    id
                },
                data: {
                    ...req.body,

                    transactionDate:
                        req.body.transactionDate
                            ? new Date(req.body.transactionDate)
                            : undefined
                }
            });

        res.status(200).json({
            success: true,
            data: updatedTransaction
        });

    } catch (error) {
        next(error);
    }
};

export const deleteTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const userId =
            (req as AuthRequest).userId;

        const id =
            req.params.id as string;

        const existingTransaction =
            await prisma.transaction.findFirst({
                where: {
                    id,
                    userId
                }
            });

        if (!existingTransaction) {
            throw new ApiError(
                404,
                "Transaction not found"
            );
        }

        await prisma.transaction.delete({
            where: {
                id
            }
        });

        res.status(200).json({
            success: true,
            message: "Transaction deleted"
        });

    } catch (error) {
        next(error);
    }
};