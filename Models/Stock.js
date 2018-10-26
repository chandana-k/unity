const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StockSchema = new Schema({

  ticker: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  summary: {
    type: String,
    required: false,
    trim: true
  },
  link: {
    type: String,
    required: false,
    trim: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
  
});

const Stock = mongoose.model("Stock", StockSchema);

module.exports = Stock;