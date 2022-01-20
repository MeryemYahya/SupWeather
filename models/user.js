const mongoose = require('mongoose');

const User = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    cities: [
        {
            name: String,
            id: String,
        }
    ],
    password: {
        type: String,

    }
});

module.exports = mongoose.model('User', User)