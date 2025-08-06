import express from 'express';
import { chatWithGemini, getConversation, startNewConversation } from '../controllers/geminiController.js';
const Geminirouter = express.Router();

Geminirouter.post('/chat', chatWithGemini);
Geminirouter.get('/chat/:userId', getConversation);
Geminirouter.post('/chat/new', startNewConversation); 

export default Geminirouter;
