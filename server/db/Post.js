const conn = require("./conn");
const { TEXT, UUID, UUIDV4 } = require("sequelize");

//Sequelize Model for Posts:
const Post = conn.define("post", {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    text: {
        type: TEXT,
    },
    userId: {
        type: UUID,
      },
    feeling: {
        type: TEXT,
    },
    teamId: {
        type: UUID,
    },
});

//Post property for finding all posts given a user within a specific team.
Post.prototype.getPosts = async function () {
	let posts = await conn.models.post.findAll({
		where: {
			teamId: this.teamId,
		},
	});
	return posts;
};

module.exports = Post;