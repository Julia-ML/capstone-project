const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT } = conn.Sequelize;

//Sequelize Model for Comments:
const Comment = conn.define('comment', {
	id: {
		type: UUID,
		primaryKey: true,
		defaultValue: UUIDV4,
	},
    note: {
        type: TEXT,
    }
});

module.exports = Comment;