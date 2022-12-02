const express = require("express");
const app = express.Router();
const { Project } = require("../db");
module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Project.findAll());
  } catch (ex) {
    next(ex);
  }
});
