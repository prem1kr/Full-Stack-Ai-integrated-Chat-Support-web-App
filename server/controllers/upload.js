import uploadModel from "../models/upload.js";

export const upload = async (req , res) => {
    const { Q, A } = req.body;

    try{
       const newUpload = await uploadModel.create({
        Q,
        A
       });
       console.log("Data uploaded successfully:" , newUpload);
       res.status(201).json({message: "Data uploaded successfully", data: newUpload});

    }catch(error){
        console.error("Error uploading data:", error);
        res.status(500).json({message: "Error uploading data"});
    }
}

export const getUploads = async (req, res) => {
    try{
        const uploads = await uploadModel.find();
        console.log("Uploads fetched successfully:", uploads);
        res.status(202).json({message: "Uploads fetched successfully", data: uploads});

    }catch(error){
        console.log("Error fetching uploads:", error);
        res.status(501).json({message:"Error fetching uploads"});
    }
}
