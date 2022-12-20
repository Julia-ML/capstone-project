const express = require("express");
const app = express.Router();
const { Post } = require("../db");
module.exports = app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
    try {
      const post = await Post.findByToken(req.headers.authorization);
      res.send(await post.getPosts());
    } catch (ex) {
      next(ex);
    }
});

app.post("/", async (req, res, next) => {
    try {
      const post = await Post.create(req.body);
      res.send(post);
    } catch (ex) {
      next(ex);
    }
});