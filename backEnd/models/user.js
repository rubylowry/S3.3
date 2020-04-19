//James code
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  username : String,
  email : String,
  password : String
  // avatar : String
});
module.exports = mongoose.model('User', userSchema);
//James's code ends