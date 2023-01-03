const express = require("express");
const app = express.Router();
const { Post } = require("../db");

module.exports = app;

//API Route for cdisplaying all posts
app.get("/", async (req, res, next) => {
    try {
      const post = await Post.findAll();
      res.send(post);
    } catch (ex) {
      next(ex);
    }
});

//API Route for creating a new post
app.post("/", async (req, res, next) => {
    try {
      const post = await Post.create(req.body);
      res.send(post);
    } catch (ex) {
      next(ex);
    }
});