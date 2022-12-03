const express = require("express");
const app = express.Router();
const { User, Team } = require("../db");
module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await User.findAll({ include: Team }));
  } catch (ex) {
    next(ex);
  }
});
