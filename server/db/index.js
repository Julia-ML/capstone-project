const conn = require("./conn");
const User = require("./User");
const Project = require("./Project");
const Team = require("./Team");
const Task = require("./Task");

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

	// create teams for users to join
	const [teamMoe] = await Promise.all([
		Team.create({
			name: "Team Moe",
		}),
	]);

	const [teamLarry] = await Promise.all([
		Team.create({
			name: "Team Larry",
		}),
	]);

	// create users
	const [moe, lucy, larry, foo, bar, bazz, ethyl] = await Promise.all([
		User.create({
			username: "moe",
			password: "123",
			firstName: "moe",
			lastName: "moelastname",
			email: "moe@email.com",
			teamId: teamMoe.id,
		}),
		User.create({
			username: "lucy",
			password: "123",
			firstName: "lucy",
			lastName: "lucylastname",
			email: "lucy@email.com",
			teamId: teamMoe.id,
		}),
		User.create({
			username: "larry",
			password: "123",
			firstName: "larry",
			lastName: "larrylastname",
			email: "larry@email.com",
			teamId: teamLarry.id,
		}),
		User.create({
			username: "ethyl",
			password: "123",
			firstName: "ethyl",
			lastName: "ethyllastname",
			email: "ethyl@email.com",
			teamId: teamLarry.id,
		}),
	]);

	// create projects to give to teams and managers
	const [newProj, snackProj, larryProj] = await Promise.all([
		Project.create({
			name: "Moe Mojo",
			description: "A new coding app by the world famous Moe.",
			userId: moe.id,
			teamId: teamMoe.id,
		}),
		Project.create({
			name: "SnackClub",
			description: "A new snack subscription app service.",
			userId: moe.id,
			teamId: teamMoe.id,
		}),
		Project.create({
			name: "Larry Code App",
			description: "A new coding app by the world famous Larry.",
			userId: larry.id,
			teamId: teamLarry.id,
		}),
	]);

	// create tasks for projects
	await Promise.all([
		Task.create({
			name: "Create repo",
			description: "We need to create the base repository.",
			projectId: newProj.id,
			status: "Done",
		}),
		Task.create({
			name: "Create repo",
			description: "We need to create the base repository.",
			projectId: snackProj.id,
			status: "To Do",
		}),
		Task.create({
			name: "Create repo",
			description: "We need to create the base repository.",
			projectId: larryProj.id,
			status: "To Do",
		}),
		Task.create({
			name: "Assign first tasks",
			description: "We need to assign the first tasks.",
			projectId: newProj.id,
		}),
		Task.create({
			name: "Email team links",
			description: "Email all the team members the links to their resources.",
			projectId: newProj.id,
		}),
		Task.create({
			name: "Draft the budget",
			description: "Use the existing Excel template in the folder.",
			projectId: newProj.id,
		}),
		Task.create({
			name: "Create wireframes",
			description: "We need to finish planning the project.",
			projectId: newProj.id,
			status: "In Progress",
		}),
	]);
	return {
		users: {
			moe,
			lucy,
			larry,
		},
	};
};

module.exports = {
	syncAndSeed,
	User,
	Project,
	Task,
	Team,
};
