'use strict'; 

const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize'); 

const ToDo = sequelize.define('Completed', 
    {
        id: {
            type: Sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        }, 
        value: {
            type: Sequelize.STRING, 
            allowNull: false
        }
    }, 
    {
        tableName: 'todo', 
        timestamps: false, 
        underscored: true
    }
); 

ToDo.associate = function(models) {
    ToDo.belongsTo(
        models.Board, 
        {
            as: 'board', 
            foreignKey: { allowNull: false }, 
            onDelete: 'CASCADE'
        }
    )
}

module.exports = {
    ToDo
}