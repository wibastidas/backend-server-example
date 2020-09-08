const { Schema, model } = require('mongoose');

const AccountSchema = Schema({

    id: {
        type: Number,
        required: true
    },

    currency_id: {
        type: Number,
        required: true
    },

    account_number: {
        type: Number,
        required: true
    },

    balance: {
        type: Number,
        required: true
    }
    
});

modele.exports = model('Account', AccountSchema);