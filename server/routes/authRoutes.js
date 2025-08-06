import express from "express";
import { Forgot, Login, Logout, Signup } from "../controllers/authUser.js";

const router = express();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout",Logout);
router.put("/forgot", Forgot);


export default router;