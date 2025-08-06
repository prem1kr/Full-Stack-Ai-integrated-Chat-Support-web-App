import express from 'express';
import { isLogedin } from '../controllers/protected.js';
const protectedRoute = express();


protectedRoute.get("/protectedRoutes", isLogedin, (req, res) => {
    res.status(200).json({ message: "User is authenticated", user: req.user });
});


export default protectedRoute;