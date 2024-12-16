import { initializeBot } from "./core.js";
import { connectDatabase } from "./utils/database.js";
import { createBot } from "./jobs/botHandler.js";

async function start() {
  try {
    const config = await initializeBot();
    await connectDatabase(config.mongoUri);
    await createBot(config);
    console.log("Bot is running");
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
}

start();
