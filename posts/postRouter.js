const express = require('express');
const posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  posts.get()
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          message: "this user has no posts"
        })
      }
      return res.status(200).json(post)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: "could not retrieve user posts"
      })
    })
  }
);

router.get('/:id', (req, res) => {
  
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
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

