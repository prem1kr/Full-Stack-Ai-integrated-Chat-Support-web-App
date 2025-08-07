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




// Hardcoded admin credentials
const ADMIN_EMAIL = 'prek97344@gmail.com';
const ADMIN_PASSWORD = '123456';

export function isAdmin  (req,res,next) {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.status(200).json({ success: true, message: 'Admin login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};


