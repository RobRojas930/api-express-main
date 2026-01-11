const mongoose = require('mongoose');
const { categorySchema } = require('./category.model');
const Schema = mongoose.Schema;
//MODELO DE LA BD
//DEFINIR
const transactionSchema = new Schema({
    id: mongoose.Types.ObjectId,
    title: String,
    description: String,
    amount: Number,
    date: Date,
    type: String,
    userId: String,
    category: [categorySchema],
});
const model = mongoose.model('transaction', transactionSchema);
module.exports = model;
