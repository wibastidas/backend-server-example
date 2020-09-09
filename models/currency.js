const { Schema, model } = require('mongoose');

const CurrencySchema = Schema({

    id: {
        type: Number,
        required: false
    },

    name: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = model('Currency', CurrencySchema);