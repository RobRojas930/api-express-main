const mongoose = require('mongoose');

const deptSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    amount: {
        type: Number,
        required: true
    },
    amountPaid: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Dept', deptSchema);