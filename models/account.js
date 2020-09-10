const { Schema, model } = require('mongoose');

const AccountSchema = Schema({

    id: {
        type: Number,
        required: false
    },

    currency_id: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

module.exports = model('Account', AccountSchema);