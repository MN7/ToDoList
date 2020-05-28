const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TdSchema = new Schema({
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
