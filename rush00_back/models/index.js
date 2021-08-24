const Sequelize = require("sequelize");
const config = require("./../config/config.js")["development"];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user.js")(sequelize, Sequelize);
db.Board = require("./board.js")(sequelize, Sequelize);
db.Comment = require("./comment.js")(sequelize, Sequelize);

db.Board.hasMany(db.Comment, { foreignKey: "postId", sourceKey: "id" });
db.Comment.belongsTo(db.Board, { foreignKey: "postId", targetKey: "id" });

module.exports = db;
