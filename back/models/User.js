module.exports = function (sequelize, DataTypes) {
	let user = sequelize.define("User", {
		index : {
			filled : "index",
			type: DataTypes.INTEGER,
			unique: true,
			allowNull: false,
			autoIncrement : true
		},
		id : {
			filled : "id",
			type: DataTypes.STRING(8),
			unique: true,
			allowNull: false,
			primaryKey: true
		},
		jwtkey : {
			filed : "jwtkey",
			type: DataTypes.STRING(150),
			allowNull : true
		},
		password: {
			filled: "pass",
			type: DataTypes.STRING(100),
			allowNull: false
		}},
		{
			charset: "utf8",
			freezeTableName: true,
			tableName: "User",
			timestamps: true
		});
		return user;
}
