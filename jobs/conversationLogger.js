import { Conversation } from "../models/conversation.js";

export const logConversation = async (
  userId,
  message,
  response,
  state = {}
) => {
  try {
    const conversation = new Conversation({
      userId,
      message,
      response,
      timestamp: new Date(),
      metadata: {
        familySize: state.familySize || null,
        householdIncome: state.householdIncome || null,
        gender: state.gender || null,
        step: state.step || "initial",
      },
    });
    await conversation.save();
  } catch (error) {
    console.error("Logging error:", error);
  }
};
