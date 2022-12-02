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

app.post("/create", async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.send(project);
  } catch (ex) {
    next(ex);
  }
});

app.delete("/:id", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    project.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
