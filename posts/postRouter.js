const express = require('express');
const posts = require('./postDb');

const router = express.Router();

router.get('/posts', (req, res) => {
  posts.get()
    .then((post) => {
        return res.status(200).json(post)
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: "could not retrieve posts"
      })
    })
  }
)
});

router.get('/posts/:id', validatePostId(), (req, res) => {
    res.status(200).json(req.post)
});

router.delete('/posts/:id', validatePostId(), (req, res) => {
    posts.remove(req.post)
});

router.put('/posts/:id', validatePostId(), (req, res) => {
    posts.update(req.post)
});

// custom middleware

function validatePostId() {
  return (req, res, next) => {
    posts.getById(req.params.id)
      .then((post) => {
        if (user) {
          req.post = post
          next()
        } else {
          res.status(404).json({
            message: "invalid post id",
          })
          next()
        }
      }) 
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          message: "Error retrieving post"
        })
      })
    }
  }

module.exports = router;

