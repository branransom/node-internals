// Each child in the threadpool has this many threads
process.env.UV_THREADPOOL_SIZE = 2;

/**
 * Do not use nodemon with clusters!! (may see odd behavior)
 */
const cluster = require("cluster");

if (cluster.isMaster) {
  // Cause index.js to be executed *again* but in child mode
  cluster.fork();
  cluster.fork();
} else {
  // I'm a child. I'm going to act like a server and do nothing else
  const express = require("express");
  const crypto = require("crypto");
  const app = express();

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("Hi there");
    });
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  app.listen(3000);
}
