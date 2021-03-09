const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  category: {type: String, required: true, minlength: 1, maxlength: 100, },
  question: {type: String, required: true,},
  answer: {type: String, required: true,},

});

module.exports.schema = cardSchema;
module.exports.Card = mongoose.model('Card', cardSchema);