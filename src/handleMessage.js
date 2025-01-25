import bot from "./bot.js";
import generateText from "./text-agent.js";
import generateImage from "./image-agent.js";

export function handleMessage(botName, msg) {
  const { chat, message_id, text } = msg;
  const chatId = chat.id;

  console.log(`从[${chatId}]收到消息[${message_id}]: ${text}`);

  const process = needProcess(botName, msg);
  if (process) {
    generateText(botName, msg);
  } else {
    if (text.startsWith("/image ")) {
      handleImageRequest(msg);
    }
  }
}
async function handleImageRequest(msg) {
  const { chat, message_id, text } = msg;
  const chatId = chat.id;

  const url = await generateImage(text.replace("/image ", ""));
  bot.sendPhoto(chatId, url, {
    reply_to_message_id: message_id,
    allow_sending_without_reply: true,
  });
}
const needProcess = (botName, msg) => {
  const { text } = msg;
  // 检查消息是否在群里 @ 了机器人
  if (msg.chat.type === "group" || msg.chat.type === "supergroup") {
    if (text && text.includes(`@${botName}`)) {
      return true;
    }
  }
  return false;
};
