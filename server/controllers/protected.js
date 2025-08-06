import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function isLogedin(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        req.user = data;
        next();
    } catch (error) {
        return res.status(403).send("Invalid or expired token");
    }
}
