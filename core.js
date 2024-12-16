import dotenv from "dotenv";
dotenv.config();

export const initializeBot = async () => {
  const config = {
    telegramToken: process.env.TELEGRAM_BOT_TOKEN,
    openaiKey: process.env.OPENAI_API_KEY,
    mongoUri: process.env.MONGODB_URI,
  };
  return config;
};
