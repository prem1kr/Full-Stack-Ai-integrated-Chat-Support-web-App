import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
    Q: String,
    A: String
});

const uploadModel = mongoose.model('Upload', uploadSchema);
export default uploadModel; 