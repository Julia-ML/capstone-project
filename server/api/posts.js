const express = require("express");
const app = express.Router();
const { Post } = require("../db");
module.exports = app;

app.get("/", async (req, res, next) => {
    try {
      const post = await Post.findByToken(req.headers.authorization);
      res.send(await post.getPosts());
    } catch (ex) {
      next(ex);
    }
  });