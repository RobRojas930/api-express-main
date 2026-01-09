const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const categorySchema = new Schema({
  id: mongoose.Types.ObjectId,
  idProduct: String,
  name: String,
  description: String,
  color: String,
  icon: String,
});
const Model = mongoose.model('categories', categorySchema);
module.exports = { Model, categorySchema };
