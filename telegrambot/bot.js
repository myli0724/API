const { Telegraf } = require('telegraf');
const axios = require('axios');

// 创建 Telegraf 实例
const botToken = '6102981568:AAHmWGKJKUm_s8PbfiHePCz03hx05LLcM2M';  // 替换为你的 Telegram Bot Token
const bot = new Telegraf(botToken);

// 处理 /say 命令
bot.command('say', async (ctx) => {
  try {
    const quoteEndpoint = 'http://localhost:3000/quotes/random'; // 替换为你的 API Endpoint
    const response = await axios.get(quoteEndpoint);
    const quote = response.data;
    const text = quote.text;
    
    // 发送语录给用户
    ctx.reply(text);
  } catch (error) {
    console.log(error);
    ctx.reply('获取语录时出现错误');
  }
});

// 启动 Bot
bot.launch().then(() => {
  console.log('Bot is running...');
});
