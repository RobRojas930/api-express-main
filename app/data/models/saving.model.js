const mongoose = require('mongoose');

const SavingSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    montoAAhorrar: {
        type: Number,
        required: true
    },
    montoAhorrado: {
        type: Number,
        required: true,
        default: 0
    },
    color: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('saving', SavingSchema);
