'use strict'; 

const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs'); 
const {sequelize} = require('../db/sequelize'); 

const User = sequelize.define('User', 
    {
        id: {
            type: Sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        }, 
        username: {
            type: Sequelize.STRING, 
            allowNull: false
        }, 
        password: {
            type: Sequelize.STRING, 
            allowNull: false
        }
    }, 
    {
        tableName: 'users', 
        timestamps: false, 
        underscored: true
    }
);

User.associate = function(models) {
    User.hasMany(
        models.Board, 
        {
            as: 'boards', 
            foreignKey: { allowNull: false }, 
            onDelete: 'CASCADE'
        }
    )
}

User.prototype.validatePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

User.prototype.apiRepr = function () {
    return {
        id: this.id, 
        username: this.username
    }
}

module.exports = {
    User
}