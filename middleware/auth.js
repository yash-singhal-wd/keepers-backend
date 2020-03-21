const jwt = require("jsonwebtoken");
const config = require("config");

async function auth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("No token provided!");
    try {
        const decoded = await jwt.verify(token, config.get("jwtPrivateKey"));
        req.user = decoded;
        next();
    } catch (ex) {
        console.log(ex);
        res.status(400).send("Invalid token!");
    }
}
module.exports.auth = auth;