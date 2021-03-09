const mongoose = require('mongoose');
const myCard = require('./Card');

const collectionSchema = new mongoose.Schema({
  title: {type: String, required: true, minlength:1},
  cards: [myCard.schema],

});

module.exports = mongoose.model('Collection', collectionSchema);