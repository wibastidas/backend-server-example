const { Schema, model } = require('mongoose');

const TransactionSchema = Schema({

    id: {
        type: Number,
        required: true
    },

    accountFrom: {
        type: Number,
        required: true
    },

    accountTo: {
        type: Number,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    user_id: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true
    }

});

modele.exports = model('Transaction', TransactionSchema);