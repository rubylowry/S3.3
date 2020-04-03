//Natalia's code
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  username : String,
  title : String,
  description : String,
  imageUrl : String,
  date: String,
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }
});
module.exports = mongoose.model('Post', postSchema);

n