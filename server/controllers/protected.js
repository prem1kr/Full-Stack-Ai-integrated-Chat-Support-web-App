import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function isLogedin(req, res, next) {
    const token = req.cookies?.token; 

    if (!token) {
        return res.status(401).json({message: "login first"});
    }
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY); 

        req.user = data;
        next();
    } catch (error) {
        return res.status(403).send("Invalid or expired token");
    }
}
