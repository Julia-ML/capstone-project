const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, DECIMAL, INTEGER, DATE } = conn.Sequelize;

//Sequelize Model for Logs:
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
    type: DECIMAL,
  },
  total: {
    type: INTEGER,
  },
});

module.exports = Log;
