require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 4000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err) => {
    console.error(err);
})
db.once('open', () => console.log('Database Connected'));

app.use(express.json());

const gameDataRouter = require('./routes/gameData');
app.use('/gameData', gameDataRouter);

app.listen(PORT, () => {
    console.log("server started on port " + PORT);
})