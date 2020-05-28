const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const todoitems = require("./routes/api/todoitems.js");

const app = express();

app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/api/todoitems', todoitems);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
