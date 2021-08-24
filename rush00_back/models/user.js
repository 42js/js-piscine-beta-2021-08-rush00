module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("now()"),
      },
      token: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      refreshToken: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
};
