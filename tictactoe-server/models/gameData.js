const mongoose = require('mongoose');

const gameDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        require: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('GameData', gameDataSchema);