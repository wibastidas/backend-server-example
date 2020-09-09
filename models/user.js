const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    id: {
        type: Number,
        required: false
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});


module.exports = model('User', UserSchema);