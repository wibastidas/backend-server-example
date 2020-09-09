const { Schema, model } = require('mongoose');

const TransactionSchema = Schema({

    id: {
        type: Number,
        required: false
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

    created_at: {
        type: Number,
        required: false
    },

    description: {
        type: String,
        required: false
    },

    user_id: {
        type: Number,
        required: false
    },

    status: {
        type: String,
        required: false
    }

});

TransactionSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Transaction', TransactionSchema);