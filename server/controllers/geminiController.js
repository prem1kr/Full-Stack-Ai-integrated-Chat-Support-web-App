import axios from 'axios';
import dotenv from 'dotenv';
import Conversation from '../models/Conversation.js';

dotenv.config();

const geminiEndpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const chatWithGemini = async (req, res) => {
  const { message, userId } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: "Missing userId or message" });
  }

  try {
    const response = await axios.post(
      `${geminiEndpoint}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: message }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    let conversation = await Conversation.findOne({ userId });

    if (!conversation) {
      conversation = new Conversation({ userId, messages: [] });
    }

    conversation.messages.push({ from: 'user', text: message });
    conversation.messages.push({ from: 'bot', text: reply });

    await conversation.save();

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from Gemini" });
  }
};

export const getConversation = async (req, res) => {
  const { userId } = req.params;

  try {
    let convo = await Conversation.findOne({ userId:req.params.userId });

    if (!convo) {
      convo = new Conversation({ userId, messages: [] });
      await convo.save();
    }

    res.json({ messages: convo.messages });
  } catch (err) {
    console.error("Error loading conversation:", err.message);
    res.status(500).json({ error: "Failed to load conversation" });
  }
};

export const startNewConversation = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const newConvo = new Conversation({
      userId,
      messages: [],
    });

    await newConvo.save();

    res.status(200).json(newConvo);
  } catch (err) {
    console.error("Error starting new chat:", err.message);
    res.status(500).json({ error: "Failed to start new conversation" });
  }
};
