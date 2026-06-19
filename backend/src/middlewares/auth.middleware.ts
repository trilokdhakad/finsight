import {
    Request,
    Response,
    NextFunction
} from "express";

import jwt from "jsonwebtoken";

import { ApiError } from "../errors/ApiError";
import { AuthRequest } from "../types/auth-request";

interface JwtPayload {
    userId: string;
}

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const authHeader =
            req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {
            throw new ApiError(
                401,
                "Unauthorized"
            );
        }

        const token =
            authHeader.split(" ")[1];

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_ACCESS_SECRET!
            ) as JwtPayload;

        (req as AuthRequest).userId =
            decoded.userId;

        next();

    } catch {

        next(
            new ApiError(
                401,
                "Invalid token"
            )
        );
    }
};