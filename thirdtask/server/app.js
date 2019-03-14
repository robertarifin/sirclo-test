const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');

const PORT = 3000;
require('dotenv').config();

mongoose.connect(`mongodb://localhost:27017/${process.env.NODE_ENV}`);
app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})


