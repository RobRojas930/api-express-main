const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    initialAmount: {
        type: Number,
        required: true
    },
    currentAmount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    color: {
        type: String
    },
    accountType: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('account', accountSchema);