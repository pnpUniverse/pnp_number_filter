var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  mobileNumber : { type:Number, min: 0, unique:true}
});

module.exports = mongoose.model('User',UserSchema);