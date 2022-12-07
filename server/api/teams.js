const express = require("express");
const app = express.Router();
const { User, Team } = require("../db");

app.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    res.send(
      await Team.findByPk(user.teamId, {
        include: [{ model: User }],
      })
    );
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
