import bcrypt from "bcryptjs";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const Signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            console.log(`User already exists: ${existingUser}`);
            return res.status(409).json({ message: "User already exists. Please log in.", user: existingUser });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({ message: "User created successfully", user: createUser });

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Error during signup" });
    }
};


export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up first." });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    let token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
    res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",  
    maxAge: 24 * 60 * 60 * 1000
    });


    console.log(user);
    return res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.log("Error during login process:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Logout = async (req, res) => {
    try {
      res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax"  
      });


        console.log("Logout successfully");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Error during logout" });
    }
};

export const Forgot = async(req, res) => {
    const {email, password} =req.body;
    try{
       let hash = await bcrypt.hash(password, 10);
       const user = await userModel.findOneAndUpdate(
       { email},
        {password:hash},
       { new:true}
     );
    if(!user){
        res.status(201).json({message:"user not found", user});
    }
    res.status(200).json({message:"password updated successfully"});

    }catch(error){
        console.log("Error during forgot password");
        res.status(201).json({message:"Error during forgot password"});
    }
}




