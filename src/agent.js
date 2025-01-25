import OpenAI from "openai";
import config from "./config.js";

const openai = new OpenAI({
  // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
  apiKey: config.TEXT_AGENT_KEY, // 如何获取API Key：https://help.aliyun.com/zh/model-studio/developer-reference/get-api-key
  baseURL: config.TEXT_AGENT_BASE_URL,
});
export default openai;
