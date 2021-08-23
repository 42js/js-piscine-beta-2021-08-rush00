'use strict';
require('dotenv').config();
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
const { subscribe } = require('../routes');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type : DataTypes.STRING,
      allowNull: false
    },
    email: 
    {
      type : DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: '이미 존재하는 이메일입니다.',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/i,
      },
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', async (user, options)=>{
    const salt = await bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
    return bcrypt.hash(user.password, salt).then((hash) => {
      user.password = hash;
      user.salt = salt;
    });
  })

  return User;
};