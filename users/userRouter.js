const express = require('express');
const users = require("./userDb.js");
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  users.get()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      res.status(500).json({
        message: "Could not get users"
      })
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  users.getById(req.params.id)
    
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!

});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  users.getById(req.params.id)
    .then((user) => {
      if (user) {
        next()
      } else {
        res.status(400).json({
          message: "invalid user id"
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: "Error retrieving user"
      })
    })
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    return res.status(400).json({
      message: "missing user data"
    })
  }
  if (!req.body.name) {
    return res.status(400).json({
      message: "missing required name field"
    })
  }
  next()  
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    return res.status(400).json({
      message: "missing user data"
    })
  }
  if (!req.body.text) {
    return res.status(400).json({
      message: "missing required text field"
    })
  }
  next()
}

module.exports = router;
