const express = require('express');
const users = require('./userDb')
const router = express.Router();

router.post('/', validateUser(), (req, res) => {
    
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {
});

router.get('/', (req, res) => {
    users.get()
      .then((users) => {
        res.status(200).json(users)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          message: "Error in retrieving users"
        })
      })
});

router.get('/:id', validateUserId(), (req, res) => {
    res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res) => {
    users.getUserPosts(req.user)
      .then((posts) => {
        res.status(200).json(posts)
      })
      .catch((err) => {
        console.log(err)

      })
});

router.delete('/:id', validateUserId(), (req, res) => {
    users.delete(req.user)
      .then((user) => {
        res.status(200).json({
          message: `user ${id} was successfully deleted`
        })
      })
      .then((err) => {
        res.status(500).json({
          message: 'user could not be deleted'
        })
      })
});

router.put('/:id', validateUserId(), (req, res) => {
    users.update(req.user, req.body)
      .then((changes) => {
        res.status(200).json(changes.length)
      })
      .catch((err) => {
        res.status(500).json({
          message: "could not update user"
        })
      })
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

