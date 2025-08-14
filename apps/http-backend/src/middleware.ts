import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common';
import { Request, Response, NextFunction } from "express";

export function Middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"] ?? "";
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded) {
        // @ts-expect-error // fix this
        req.userId = decoded.userId;
        next();
    } else {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
}
