export function Middleware(req:Request, res:Response, next:NextFunction) {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
}
