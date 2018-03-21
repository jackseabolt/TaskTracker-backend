'use strict'; 

const { User } = require('./user'); 
const { Board } = require('./board'); 
const { Completed } = require('./completed'); 
const { ToDo } = require('./todo'); 

const db = {
    User, 
    Board, 
    Completed, 
    ToDo
}

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db); 
    }
    else {
        console.log("NOT ASSOCIATED", modelName)
    }
}); 

module.exports = db; 