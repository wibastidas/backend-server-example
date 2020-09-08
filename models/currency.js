const { Schema, model } = require('mongoose');

const CurrencySchema = Schema({

    id: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    }
});

modele.exports = model('Currency', CurrencySchema);