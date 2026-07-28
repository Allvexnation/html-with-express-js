import type {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export function verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const auth = req.headers.authorization;

    if (!auth) 
       return res.sendStatus(401);
    
    const token = auth.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(
        token,
        process.env.JWTSECRET!,
        (err) => {
            if (err)
                return res.sendStatus(403);

            next();
        } 
    );
}