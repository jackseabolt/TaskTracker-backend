'use strict'; 

const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize'); 

const Completed = sequelize.define('Completed', 
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
        tableName: 'completed', 
        timestamps: false, 
        underscored: true
    }
); 

Completed.associate = function(models) {
    Completed.belongsTo(
        models.Board, 
        {
            as: 'board', 
            foreignKey: { allowNull: false }, 
            onDelete: 'CASCADE'
        }
    )
}

module.exports = {
    Completed
}