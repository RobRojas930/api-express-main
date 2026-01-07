const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
//DEFINIR
const transactionSchema = new Schema({
    id: mongoose.Types.ObjectId,
    title: String,
    amount: Number,
    date: Date,
    idCategory: String
});
const model = mongoose.model('transaction', transactionSchema);
module.exports = model;
