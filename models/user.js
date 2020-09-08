const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    id: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    }
});

module.exports = model('User', UserSchema);