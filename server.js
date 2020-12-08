const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const time = new Date().toISOString()
  console.log(`${req.method} ${req.url} {time}`)
  next()
}



module.exports = server;
