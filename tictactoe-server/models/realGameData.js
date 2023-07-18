const mongoose = require('mongoose');

const FinalGameDataSchema = new mongoose.Schema({
    playerOneName: {
        type: String,
        required: true
    },
    playerTwoName: {
        type: String,
        required: true
    },
    playerOneWins: {
        type: Number,
        default: 0,
    },
    playerTwoWins: {
        type: Number,
        default: 0,
    },
    playerOneLosses: {
        type: Number,
        default: 0,
    },
    playerTwoLosses: {
        type: Number,
        default: 0,
    },
    draws: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        require: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('FinalGameDataSchema', FinalGameDataSchema);