import TelegramBot from "node-telegram-bot-api";
import { handleGPTResponse } from "./gptHandler.js";
import { logConversation } from "./conversationLogger.js";
import { updateUserState, createUserState } from "../models/userState.js";
import { validateUserInput } from "../utils/validators.js";

export const createBot = async (config) => {
  const bot = new TelegramBot(config.telegramToken, { polling: true });
  const userStates = new Map();

  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    userStates.set(chatId, createUserState());
    const response =
      "Hello! I'm here to help you find a health insurance plan. Would you like to explore your options?";
    await bot.sendMessage(chatId, response);
    await logConversation(chatId, "/start", response);
  });

  bot.on("message", async (msg) => {
    if (msg.text === "/start") return;

    const chatId = msg.chat.id;
    const userState = userStates.get(chatId) || createUserState();

    if (validateUserInput(msg.text, userState.step)) {
      const { response, nextPrompt } = await handleGPTResponse(
        msg.text,
        config.openaiKey,
        userState
      );
      await bot.sendMessage(chatId, response);
      if (nextPrompt) {
        await bot.sendMessage(chatId, nextPrompt);
      }
      await logConversation(chatId, msg.text, response, userState);
      userStates.set(chatId, updateUserState(userState, msg.text));
    } else {
      await bot.sendMessage(chatId, "Please provide a valid response.");
    }
  });

  return bot;
};
