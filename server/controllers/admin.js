import userModel from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find(); 

    console.log(`Users successfully fetched`);
    res.status(200).json({message: "Users fetched successfully",users});
  } catch (error) {
    console.error("Error fetching users for admin:", error);
    res.status(500).json({
      message: "Error during user fetching for admin",
      error: error.message,
    });
  }
};
