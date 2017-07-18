var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FilterFileSchema = new Schema({
  areaCode : { type: String},
  phoneNumber : { type: String},
  prefrence : { type: String},
  opsType : { type: String},
  phoneType : { type: String}
});

module.exports = mongoose.model('FilterData',FilterFileSchema);