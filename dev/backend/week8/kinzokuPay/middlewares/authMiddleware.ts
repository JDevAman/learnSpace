import { verifyjwt } from '../utils/tokens';

// using cookies + Jwt to authenticate
function authenticate(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }
    try {
        const decoded = verifyjwt(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default authenticate;