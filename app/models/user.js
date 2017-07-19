var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userName : { type:String, unique:true},
  password : { type:String},
  name : { type:String},
  mobileNumber : { type:Number, min: 0, unique:true}
});

module.exports = mongoose.model('User',UserSchema);