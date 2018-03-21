'use strict'; 

const Sequelize = require('sequelize');
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

module.exports = {
    User
}