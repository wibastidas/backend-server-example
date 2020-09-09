const { Schema, model } = require('mongoose');

const CurrencySchema = Schema({

    _id: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true
    }
});

module.exports = model('Currency', CurrencySchema);