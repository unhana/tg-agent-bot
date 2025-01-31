import openai from "./agent.js";
import config from "./config.js";
import bot from "./bot.js";

const generateText = async (botName, msg) => {
  const { chat, message_id, text } = msg;
  const chatId = chat.id;
  const realText = text.replace(`@${botName}`, "");

  const completion = await openai.chat.completions.create({
    model: config.TEXT_AGENT_MODEL,
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant about solana and crypto.",
      },
      { role: "user", content: realText },
    ],
  });
  const content = completion.choices[0].message.content;
  console.log(content);
  bot
    .sendMessage(chatId, content, {
      reply_to_message_id: message_id,
      allow_sending_without_reply: true,
    })
    .then((sendedMessage) => {
      console.log("消息发送成功", sendedMessage);
    });
};

export default generateText;
