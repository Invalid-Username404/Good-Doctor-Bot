import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  userId: String,
  message: String,
  response: String,
  timestamp: Date,
  metadata: {
    familySize: Number,
    householdIncome: Number,
    gender: String,
  },
});

export const Conversation = mongoose.model("Conversation", conversationSchema);
