const express = require('express');
const users = require('./userDb')
const router = express.Router();

router.post('/', validateUser(), (req, res) => {
    
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
    res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
    users.getUserPosts(req.user)
      .then((posts) => {
        res.status(200).json(posts)
      })
      .catch((err) => {
        console.log(err)

      })
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId(), (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId() {
    return (req, res, next) => {
      users.getById(req.params.id)
        .then((user) => {
          if (user) {
            req.user = user
            next()
          } else {
            res.status(404).json({
              message: "invalid user id",
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
    }

function validateUser() {
  return (req, res, next) => {
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
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: "missing post data"
      })
    }
    if (!req.body.text) {
      return res.status(400).json({
        message: "missing required text field"
      })
    } next()
  }
}

module.exports = router;

