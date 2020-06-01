const express=require("express");
const router=express.Router();
const ToDoItem = require ('../../models/TodoItem.js');
const auth=require('../auth/auth.js')

/**
 * @route   GET api/items
 * @desc    Get All Items
 * @access  Public
 */

router.get('/', auth, (req, res) => {
  ToDoItem.find({userid: req.user})
    .sort({date:-1})
    .then(todoitems => res.json(todoitems));
});

/**
 * @route   POST api/items
 * desc    Create todoitem
 * access  Public
 */

router.post('/', auth, (req, res) => {
  const newToDoItem = new ToDoItem({
    "tditem": req.body.tditem, "userid": req.user
  });

  newToDoItem
    .save()
    .then(saveditem => res.json(saveditem));

});

/**
 * @route   UPDATE api/items/:id
 * desc    Update todoitem
 * access  Public
 */

router
  .post('/:id', auth, (req, res) => {
    const updToDoItem = {"tditem": req.body.tditem};
    const updId = {"_id": req.params.id};
    ToDoItem.findByIdAndUpdate(updId, updToDoItem)
      .then( () => res.json({success: true}))
      .catch(err => res.status(400).json({success:false, message: err}))
      ;
  });

/**
 * @route   DELETE api/items/:id
 * desc    Delete todoitem
 * access  Public
 */

router
  .delete('/:id', auth, (req, res) => {
  ToDoItem.findById(req.params.id)
    .then(todoitem => todoitem.deleteOne()
      .then(() => res.json({success: true}))
  )
  .catch(err => res.status(404).json({success: false, message: err}))
  ;
});

module.exports = router;
