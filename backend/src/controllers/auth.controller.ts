import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "../lib/prisma";
import { ApiError } from "../errors/ApiError";

const generateTokens = (userId: string) => {

    const accessToken = jwt.sign(
        { userId },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: "7d" }
    );

    return {
        accessToken,
        refreshToken
    };
};

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const {
            email,
            password,
            firstName,
            lastName
        } = req.body;

        const existingUser =
            await prisma.user.findUnique({
                where: { email }
            });

        if (existingUser) {
            throw new ApiError(
                400,
                "User already exists"
            );
        }

        const passwordHash =
            await bcrypt.hash(password, 10);

        const user =
            await prisma.user.create({
                data: {
                    email,
                    passwordHash,
                    firstName,
                    lastName
                }
            });

        const {
            accessToken,
            refreshToken
        } = generateTokens(user.id);

        await prisma.refreshToken.create({
            data: {
                tokenHash:
                    await bcrypt.hash(refreshToken, 10),

                expiresAt:
                    new Date(
                        Date.now() +
                        7 * 24 * 60 * 60 * 1000
                    ),

                userId: user.id
            }
        });

        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName
                },
                accessToken,
                refreshToken
            }
        });

    } catch (error) {
        next(error);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await prisma.user.findUnique({
                where: { email }
            });

        if (!user) {
            throw new ApiError(
                401,
                "Invalid credentials"
            );
        }

        const validPassword =
            await bcrypt.compare(
                password,
                user.passwordHash
            );

        if (!validPassword) {
            throw new ApiError(
                401,
                "Invalid credentials"
            );
        }

        const {
            accessToken,
            refreshToken
        } = generateTokens(user.id);

        await prisma.refreshToken.create({
            data: {
                tokenHash:
                    await bcrypt.hash(refreshToken, 10),

                expiresAt:
                    new Date(
                        Date.now() +
                        7 * 24 * 60 * 60 * 1000
                    ),

                userId: user.id
            }
        });

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName
                },
                accessToken,
                refreshToken
            }
        });

    } catch (error) {
        next(error);
    }
};