import express from 'express';
import { getUploads, upload } from '../controllers/upload.js';

const uploadRoute = express.Router();

uploadRoute.post('/upload', upload);
uploadRoute.get('/uploads', getUploads);

export default uploadRoute;