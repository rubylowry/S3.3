//Natalia's code
const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  userName : String,
  text : String
});
module.exports = mongoose.model('Comment', commentSchema);
//Natalia's code ends