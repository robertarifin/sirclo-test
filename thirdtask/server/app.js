const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const weightRouter = require('./routes/weight.js');
const PORT = 3000;
require('dotenv').config();

mongoose.connect(`mongodb://localhost:27017/weight${process.env.NODE_ENV}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully connect to db')
});

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/weight', weightRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})

module.exports = app;

