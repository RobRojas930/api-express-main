const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const categorySchema = new Schema({
  id: mongoose.Types.ObjectId,
  categoryId: String,
  idProduct: String,
  name: String,
  description: String,
  color: String,
  icon: String,
  userId: String,
});
const CategoryModel = mongoose.model('categories', categorySchema);
module.exports = { CategoryModel, categorySchema };
