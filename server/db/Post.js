const conn = require("./conn");
const { TEXT, UUID, UUIDV4 } = require("sequelize");

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
      }
});

module.exports = Post;