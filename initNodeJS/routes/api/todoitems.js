const express=require("express");
const router=express.Router();
const ToDoItem = require ('../../models/TodoItem.js');

/**
 * @route   GET api/items
 * @desc    Get All Items
 * @access  Public
 */

router.get('/', (req, res) => {
  ToDoItem.find()
    .sort({date:-1})
    .then(todoitems => res.json(todoitems));
});

/**
 * @route   POST api/items
 * desc    Create todoitem
 * access  Public
 */

router.post('/', (req, res) => {
  const newToDoItem = new ToDoItem({
    "tditem": req.body.tditem
  });

  newToDoItem
    .save()
    .then(saveditem => res.json(saveditem));

});

/**
 * @route   DELETE api/items/:id
 * desc    Delete todoitem
 * access  Public
 */

router
  .delete('/:id', (req, res) => {
  ToDoItem.findById(req.params.id)
    .then(todoitem => todoitem.deleteOne()
      .then(() => res.json({success: true}))
  )
  .catch(err => res.status(404).json({success: false, message: err}))
  ;
});

module.exports = router;
