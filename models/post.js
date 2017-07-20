var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var textPostSchema = new Schema({
  author: String,
  title: String,
  text: String,
  date: String,
  eventDate: String
});

module.exports = mongoose.model('textPost', textPostSchema);