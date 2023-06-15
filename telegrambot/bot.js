const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

// 创建 Telegraf 实例
const botToken = process.env.TG_BOT;  // 替换为你的 Telegram Bot Token
const bot = new Telegraf(botToken);

// 处理 /say 命令
bot.command('say', async (ctx) => {
  try {
    const quoteEndpoint = 'http://localhost:3000/quotes/random'; // 替换为你的 API Endpoint
    const response = await axios.post(quoteEndpoint);
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
