const e = require('express');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const crypto = require('crypto');

const port = 3000;

app.use(express.json());

// 定义语录模型
const quoteSchema = new mongoose.Schema({
  text: String,
});

const Quote = mongoose.model('Quote', quoteSchema);

// 定义路由和处理程序
app.get('/quotes', async (req, res) => {
  try {
    // 获取所有语录及其ID
    const quotes = await Quote.find({}, '_id text');
    res.json(quotes);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.get('/quotes/random', async (req, res) => {
  try {
    // 随机获取一个语录
    const count = await Quote.countDocuments();
    const randomBytes = crypto.randomBytes(4); // 生成 4 字节的随机字节序列
    const randomIndex = Math.floor(
      (randomBytes[0] / 255) * count
    ); // 将随机字节序列转换为介于 0 和 count 之间的整数
    const quote = await Quote.findOne().skip(randomIndex);
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: '服务器内部错误' });
    console.log(error);
  }
});

app.post('/quotes/random', async (req, res) => {
  try {
    // 随机获取一个语录
    const count = await Quote.countDocuments();
    const randomBytes = crypto.randomBytes(4); // 生成 4 字节的随机字节序列
    const randomIndex = Math.floor(
      (randomBytes[0] / 255) * count
    ); // 将随机字节序列转换为介于 0 和 count 之间的整数
    const quote = await Quote.findOne().skip(randomIndex);
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: '服务器内部错误' });
    console.log(error);
  }
});

app.post('/quote', async (req, res) => {
  try {
    // 创建新语录
    const { text } = req.body;
    const quote = new Quote({ text });
    await quote.save();
    res.json(quote);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.post('/quotes', async (req, res) => {
  try {
    const { quotes } = req.body; // 获取请求体中的语录数组
    const quoteIds = []; // 存储新增语录的 ID

    // 遍历语录数组，并逐个保存到数据库
    for (const text of quotes) {
      const quote = new Quote({ text });
      await quote.save();
      quoteIds.push(quote._id);
    }

    res.json({ success: true, quoteIds });
  } catch (error) {
    res.status(500).json({ error: '服务器内部错误' });
  }
});


app.delete('/quotes/:id', async (req, res) => {
  try {
    // 删除特定语录
    const { id } = req.params;
    await Quote.findByIdAndDelete(id);
    res.json({ message: '语录已成功删除' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: '服务器内部错误' });
  }
});

mongoose.set("strictQuery", false)
mongoose.
connect(process.env.DB_LINK)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(port, ()=> {
        console.log(`Node API app is running on port ${port}`)
    });
}).catch((error) => {
    console.log(error)
})
