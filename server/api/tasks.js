const express = require("express");
const app = express.Router();
const { User } = require("../db");

app.get("/", async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization);
		res.send(await user.getTasks());
	} catch (ex) {
		next(ex);
	}
});

module.exports = app;
