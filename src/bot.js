import TelegramBot from "node-telegram-bot-api";
import config from "./config.js";

const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });

export default bot;
