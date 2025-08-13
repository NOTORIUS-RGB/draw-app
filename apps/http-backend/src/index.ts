import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
const app = express();
app.post("/signup", (req:any, res:any) => {
    
})
app.post("/signin", (req:any, res:any) => {
    const userId=1;
    const token = jwt.sign({
        userId
    },JWT_SECRET);
    res.json({
        token
    })
})
app.post("/room", (req:any, res:any) => {
})

app.listen(3000);