import jwt from "jsonwebtoken";
import config from "../config";

interface UserPayload {
    id: string;
    email?: string;
    name?: string;
}

function signjwt(payload: UserPayload): string {
    return jwt.sign(payload, config.jwt_secret, { expiresIn: "1h" });
}

function verifyjwt(token: string): UserPayload {
    try {
        return jwt.verify(token, config.jwt_secret) as UserPayload;
    } catch (err) {
        console.error("JWT verification failed:", err);
        throw new Error("Invalid or expired token");
    }
}


export { signjwt, verifyjwt, UserPayload };
