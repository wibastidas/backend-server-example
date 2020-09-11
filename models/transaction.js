const { Schema, model } = require('mongoose');
const moment = require('moment');

const TransactionSchema = Schema({

    id: {
        type: Number,
        required: false
    },

    accountFromId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },

    accountToId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },

    accountFromCode: {
        type: String,
        required: true
    },

    accountToCode: {
        type: String,
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

    status: {
        type: String,
        required: false
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

});

TransactionSchema.method('toJSON', function() {
    const { __v, _id, created_at, ...object } = this.toObject();
    object.id = _id;
    object.created_at = moment.unix(created_at).format("MM-DD-YYYY");
    return object;
});

module.exports = model('Transaction', TransactionSchema);