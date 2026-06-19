import { Request, Response, NextFunction } from "express";

import { prisma } from "../lib/prisma";
import { ApiError } from "../errors/ApiError";
import { AuthRequest } from "../types/auth-request";

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

        const userId =
            (req as AuthRequest).userId;

        const category =
            await prisma.category.create({
                data: {
                    name,
                    type,
                    color,
                    icon,
                    userId
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

        const userId =
            (req as AuthRequest).userId;

        const categories =
            await prisma.category.findMany({
                where: {
                    userId
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