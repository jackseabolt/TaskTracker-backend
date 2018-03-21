'use strict'; 

const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize'); 

const Board = sequelize.define('Board', 
    {
        id: {
            type: Sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        }, 
        name: {
            type: Sequelize.STRING, 
            allowNull: false
        }
    }, 
    {
        tableName: 'boards', 
        timestamps: false, 
        underscored: true
    }
); 

Board.associate = function(models) {
    Board.belongsTo(
        models.User, 
        {
            as: 'user', 
            foreignKey: { allowNull: false }, 
            onDelete: 'CASCADE'
        }
    )
}

module.exports = {
    Board
}