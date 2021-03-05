const mongoose = require('mongoose');
const Joi = require('joi');

const cardSchema = new mongoose.Schema({
  category: {type: String, required: true, minlength: 1, maxlength: 100 },
  question: {type: String, required: true},
  answer: {type: String, required: true},

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