const mongoose = require('mongoose');
const Joi = require('joi');
const { cardSchema } = require('./card');

const collectionSchema = new mongoose.Schema({
  flashcard: { type: [cardSchema], default: [] },

});

const Collection = mongoose.model('Collection', collectionSchema);



exports.Collection = Collection;
exports.collectionSchema = collectionSchema;
module.exports = Collection;