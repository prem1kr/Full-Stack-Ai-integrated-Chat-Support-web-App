import mongoose from "mongoose";


const connectDB = async()=>{
   try{
    mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb is connected successfully");

   }catch(error){
    console.log("Error during mongodb connection");
   }
}

// const connectDB = mongoose.connect(process.env.MONGO_URI, () => {
//      console.log("MongoDB is connect succssfully");
// });

export default connectDB;
