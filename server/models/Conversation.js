import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  from: {
    type: String,
    enum: ['user', 'bot'],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: { // 👈 Unified name
    type: Date,
    default: Date.now,
  },
});

export const Message = mongoose.model("Message", messageSchema);

const conversationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Conversation", conversationSchema);
