const conn = require('./conn');
const User = require('./User');
const Project = require('./Project');
const Team = require('./Team');
const Task = require('./Task');

User.hasMany(Task);
User.hasMany(Project);
User.belongsTo(Team);
Task.belongsTo(User);
Task.belongsTo(Project);
Team.hasMany(User);
Team.hasMany(Project);
Project.belongsTo(User);
Project.hasMany(Task);
Project.belongsTo(Team);

const syncAndSeed = async () => {
	await conn.sync({ force: true });
	const [moe, lucy, larry, foo, bar, bazz, ethyl] = await Promise.all([
		User.create({ username: 'moe', password: '123' }),
		User.create({ username: 'lucy', password: '123' }),
		User.create({ username: 'larry', password: '123' }),
		User.create({ username: 'ethyl', password: '123' }),
	]);
}

module.exports = {
	syncAndSeed,
	User,
	Project,
	Task,
	Team,
};
