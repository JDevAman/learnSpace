import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

interface UserPayload {
    _id: string;
    phone?: string;
    email?: string;
    name?: string;
}

function signjwt(fetchedDetails: UserPayload): string {
    return jwt.sign(fetchedDetails, config.jwt_secret, { expiresIn: "1h" });
}

function verifyjwt(token: string): JwtPayload | string {
    try {
        return jwt.verify(token, config.jwt_secret);
    } catch (err) {
        console.error("JWT verification failed:", err);
        throw new Error("Invalid or expired token");
    }
}

export { signjwt, verifyjwt, UserPayload };
