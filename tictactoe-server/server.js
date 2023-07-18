require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// const PORT = 4000;
app.use(cors());
app.set('port', process.env.PORT || 4000);

// if (process.env.NODE_ENV === "production") {
//     console.log('Attempting to create connection to production database');
//     app.set('connection', mysql.createConnection({
//       host: process.env.RDS_HOSTNAME,
//       user: process.env.RDS_USERNAME,
//       password: process.env.RDS_PASSWORD,
//       port: process.env.RDS_PORT}));  
// } 

console.log(process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err) => {
    console.error(err);
})
db.once('open', () => console.log('Database Connected'));

app.use(express.json());

const gameDataRouter = require('./routes/gameData');
app.use('/gameData', gameDataRouter);

app.get('/', (req,res) => {
    res.send('hello world');
})

app.listen(process.env.PORT || 4000, () => {
    console.log("server started on port " + process.env.PORT || 4000);
})