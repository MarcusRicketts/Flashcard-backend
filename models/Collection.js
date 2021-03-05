const mongoose = require('mongoose');
const Joi = require('joi');

const collectionSchema = new mongoose.Schema({
  flashcards: [{}]

});

const Collection = mongoose.model('Collection', collectionSchema);



exports.Collection = Collection;
exports.collectionSchema = collectionSchema;
module.exports = Collection;