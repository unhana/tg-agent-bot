import config from "./config.js";
import axios from "axios";
const generateImage = async (prompt) => {
  const response = await startImage(prompt);
  console.log("发起图片请求成功", response);
  const taskId = response.data.output.task_id;
  return await checkTaskStatus(taskId);
};

async function startImage(prompt) {
  const IMAGE_AGENT_KEY = config.IMAGE_AGENT_KEY; // 从环境变量中读取 API 密钥

  const url =
    "https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis";
  const headers = {
    "X-DashScope-Async": "enable",
    Authorization: `Bearer ${IMAGE_AGENT_KEY}`,
    "Content-Type": "application/json",
  };

  const data = {
    model: "wanx2.1-t2i-turbo",
    input: {
      prompt,
      negative_prompt:
        "Black person,nsfw, paintings, cartoon, anime, sketches, worst quality, low quality, normal quality, lowres, watermark, monochrome, grayscale, ugly, blurry, Tan skin, dark skin, black skin, skin spots, skin blemishes, age spot, glans, disabled, bad anatomy, amputation, bad proportions, twins, missing body, fused body, extra head, poorly drawn face, bad eyes, deformed eye, unclear eyes, cross-eyed, long neck, malformed limbs, extra limbs, extra arms, missing arms, bad tongue, strange fingers, mutated hands, missing hands, poorly drawn hands, extra hands, fused hands, connected hand, bad hands, missing fingers, extra fingers, 4 fingers, 3 fingers, deformed hands, extra legs, bad legs, many legs, more than two legs, bad feet, extra feets",
    },
    parameters: {
      size: "512*512",
      n: 1,
      prompt_extend: true,
    },
  };

  return await axios.post(url, data, { headers });
}

const checkTaskStatus = (taskId) => {
  const IMAGE_AGENT_KEY = config.IMAGE_AGENT_KEY;

  return new Promise((resolve, reject) => {
    const url = `https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`;
    const headers = {
      Authorization: `Bearer ${IMAGE_AGENT_KEY}`,
    };

    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get(url, { headers });
        const { output } = response.data;
        const { task_status, results } = output;

        if (task_status === "SUCCEEDED") {
          console.log("任务成功完成！结果如下：");
          const result = results[0]; // 获取第一个结果
          console.log("生成的图像 URL:", result.url);
          console.log("原始提示:", result.orig_prompt);
          console.log("实际提示:", result.actual_prompt);

          clearInterval(intervalId); // 清除定时器
          resolve(result.url); // 返回生成的图像 URL
        } else {
          // 如果任务状态不是 "SUCCEEDED"，打印当前状态
          console.log("任务仍在处理中... 当前状态:", task_status);
        }
      } catch (error) {
        console.error("请求失败:", error);
        clearInterval(intervalId); // 发生错误时清除定时器
        reject(error); // 返回错误
      }
    }, 1000); // 每秒执行一次请求
  });
};

export default generateImage;
