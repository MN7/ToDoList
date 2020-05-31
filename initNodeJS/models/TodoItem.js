const mongoose = require('mongoose');

const TdSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  tditem: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const TodoItem = mongoose.model('todoitem', TdSchema);

module.exports = TodoItem;
