const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const todoitems = require("./routes/api/todoitems.js");
const users = require("./routes/api/users.js")

const app = express();

app.use(bodyParser.json());

dotenv.config();

// Connect to Mongo
mongoose.set('useFindAndModify', false);
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/api/todoitems', todoitems);
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
