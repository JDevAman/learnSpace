const jwt = require("jsonwebtoken");
const config = require("../config");

function signjwt(fetchedDetails) {
    console.log(fetchedDetails);
    return jwt.sign(fetchedDetails, config.jwt_secret, { expiresIn: '1h' });
}

function verifyjwt(token) {
    try {
        return jwt.verify(token, config.jwt_secret);
    } catch (err) {
        console.error("JWT verification failed:", err);
        throw err;
    }
}

module.exports = { signjwt, verifyjwt };