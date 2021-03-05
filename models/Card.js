const mongoose = require('mongoose');
const Joi = require('joi');

const cardSchema = new mongoose.Schema({
  category: String,
  question: String,
  answer: String,

});

const Card = mongoose.model('Card', cardSchema);

function validateCard(card) {
    const schema = Joi.object({
        category: Joi.string(),
        question: Joi.string(),
        answer: Joi.string(),
    });
    return schema.validate(card);
}

exports.Card = Card;
exports.validate = validateCard;
exports.cardSchema = cardSchema;
module.exports = Card;