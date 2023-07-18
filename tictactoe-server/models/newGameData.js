const mongoose = require('mongoose');

const newGameDataSchema = new mongoose.Schema({
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

module.exports = mongoose.model('NewGameData', newGameDataSchema);