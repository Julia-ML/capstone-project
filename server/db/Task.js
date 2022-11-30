const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, ENUM } = conn.Sequelize;

const Task = conn.define('task', {
	id: {
		type: UUID,
		primaryKey: true,
		defaultValue: UUIDV4,
	},
	taskName: {
		type: STRING,
	},
	description: {
		type: TEXT,
	},
	status: {
		type: ENUM('To Do', 'In Progress', 'Done'),
		defaultValue: 'To Do',
	},
});

module.exports = Task;
