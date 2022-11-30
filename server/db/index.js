const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Project = require('./Project');
const Team = require('./Team');
const Task = require('./Task');

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);
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
		Product.create({ name: 'foo' }),
		Product.create({ name: 'bar' }),
		Product.create({ name: 'bazz' }),
		User.create({ username: 'ethyl', password: '123' }),
	]);

	const cart = await ethyl.getCart();
	await ethyl.addToCart({ product: bazz, quantity: 3 });
	await ethyl.addToCart({ product: foo, quantity: 2 });
	return {
		users: {
			moe,
			lucy,
			larry,
		},
		products: {
			foo,
			bar,
			bazz,
		},
	};
};

module.exports = {
	syncAndSeed,
	User,
	Product,
	Project,
	Task,
	Team,
};
