import bot from "./bot.js";
import { handleMessage } from "./handleMessage.js";

let botName = "";
console.log("🤖 机器人已启动...");
// bot.sendMessage(-1002264220734, "🤖 机器人已启动...");
// bot.onText(/\/start/, (msg) => {
//   bot.sendMessage(msg.chat.id, "欢迎使用 Telegram 机器人！");
// });

bot.getMe().then((botInfo) => {
  botName = botInfo.username; // 获取机器人用户名
  bot.on("message", (msg) => {
    handleMessage(botName, msg);
  });

  bot.on("callback_query", (callbackQuery) => {
    console.log("callbackQuery", callbackQuery);
    const { message, data } = callbackQuery;
    const chatId = message.chat.id;

    if (data === "details") {
      bot.sendMessage(chatId, "🔎 这里是详细信息...");
    }
  });
  //   bot.sendMessage("-1002264220734", markdown, {
  //     parse_mode: "MarkdownV2",
  //     reply_markup: {
  //       inline_keyboard: [
  //         [
  //           { text: "🔍 查看详情", callback_data: "details" },
  //           { text: "📌 关注我们", url: "https://www.bilibili.com/" },
  //         ],
  //         [
  //           { text: "📌 关注我们", url: "https://www.bilibili.com/" },
  //           { text: "📌 关注我们", url: "https://www.bilibili.com/" },
  //         ],
  //       ],
  //     },
  //   });
});

const markdown = `
*bold text*
_italic text_
__underline__
~strikethrough~
*bold _italic bold ~italic bold strikethrough~ __underline italic bold___ bold*
[inline URL](http://www.example.com/)
[inline mention of a user](tg://user?id=123456789)
\`inline fixed-width code\`

\`\`\`
pre-formatted fixed-width code block
\`\`\`

\`\`\`python
pre-formatted fixed-width code block written in the Python programming language
\`\`\`
`;
