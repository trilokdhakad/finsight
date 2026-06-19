import { Request, Response, NextFunction } from "express";

import { prisma } from "../lib/prisma";
import { ApiError } from "../errors/ApiError";

const TEST_USER_EMAIL = "test@example.com";

export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const {
            name,
            type,
            color,
            icon
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
            await prisma.category.create({
                data: {
                    name,
                    type,
                    color,
                    icon,
                    userId: user.id
                }
            });

        res.status(201).json({
            success: true,
            data: category
        });

    } catch (error) {
        next(error);
    }
};

export const getCategories = async (
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

        const categories =
            await prisma.category.findMany({
                where: {
                    userId: user.id
                },
                orderBy: {
                    name: "asc"
                }
            });

        res.status(200).json({
            success: true,
            data: categories
        });

    } catch (error) {
        next(error);
    }
};