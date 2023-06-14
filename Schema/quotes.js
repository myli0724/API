const mongoose = require('mongoose')

const quotesschema = new mongoose.Schema(
    {
        text:String,
    }
);

const quotes = mongoose.model('quotes',quotesschema)
module.exports = quotes