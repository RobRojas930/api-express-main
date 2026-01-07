const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
//DEFINIR
const budgetSchema = new Schema({
    id: mongoose.Types.ObjectId,
    title: String,
    initialAmount: Number,
    currentAmount: Number,
    idCategory: String
});
const model = mongoose.model('budget', budgetSchema);
module.exports = model;
