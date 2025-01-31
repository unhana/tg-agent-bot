# tg-agent-bot

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

Telegram bot with ai agents.  
In telegram group, type /image + description to get image.  
Also, you can @[bot] talk to AI.  
Image agent model is wanx2.1-t2i-turbo from aliyun.  
Text AI You can use any model that conforms to the openai specification

# How to run

1. Create a bot in Telegram and get the token.
2. Copy .env file

```base
cp .env_template .env
```

3. Set the token in .env file
4. Set the ai agent config in .env file
5. Install dependencies and run

```base
pnpm install

pnpm run dev
```

# Use in telegram

1. Add the bot to your telegram group
2. Send /image + description to the group
3. Get the image
