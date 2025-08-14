import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common';
import { Middleware } from "./middleware.js";
import { CreateUserSchema } from "@repo/common";

const app = express();

app.post("/signup", (req: express.Request, res: express.Response) => {
    // zod validation
    const result = CreateUserSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            errors: result.error.flatten().fieldErrors
        });
    }
});

app.post("/signin", (req: express.Request, res: express.Response) => {
    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);
    res.json({
        token
    });
});

app.post("/room", Middleware, (req: express.Request, res: express.Response) => {
    // db call
    res.json({
        message: "Room created"
    });
});

app.listen(3000);