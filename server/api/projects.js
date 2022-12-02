const express = require('express');
const app = express.Router();
const Project = require('../db/Project');
const Task = require('../db/Task');
const User = require('../db/User');

app.get('/', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization);
		res.send(await user.getProjects());
	} catch (ex) {
		next(ex);
	}
});

module.exports = app;
