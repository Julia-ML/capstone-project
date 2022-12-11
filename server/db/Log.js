const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, INTEGER, DATE } = conn.Sequelize;

const Log = conn.define("log", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  date: {
    type: DATE,
  },
  value: {
    type: INTEGER,
  },
});

module.exports = Log;
