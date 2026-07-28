import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function createToken(id: string) {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET!,
        {
            expiresIn: "7d",
        }
    );
}