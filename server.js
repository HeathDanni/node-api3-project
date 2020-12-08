const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter')
const server = express();

server.use(express)
server.use(userRouter)
server.use(postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const time = new Date().toISOString()
  console.log(`${req.method} ${req.url} ${time}`)
  next()
}

module.exports = server;
