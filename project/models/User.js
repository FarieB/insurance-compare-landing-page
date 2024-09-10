'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preferences: {
      type: DataTypes.JSONB, // Use JSONB to store preferences in a flexible format
      defaultValue: {} // Default to an empty object
    }
  }, {
    hooks: {
      // This hook will run before creating or updating a user
      beforeSave: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt); // Hash the password before saving
        }
      }
    },
    defaultScope: {
      attributes: { exclude: ['password'] } // Optionally, exclude password by default in queries
    }
  });

  // Method to compare passwords during login
  User.prototype.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};

