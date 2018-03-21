const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 
const jsonParser = bodyParser.json() 
const { Board, ToDo, Completed } = require('../models'); 


// CREATE NEW BOARD
router.post('/', jsonParser, (req, res) => {
    return Board
        .create({ 
            name: req.body.name, 
            user_id: req.body.user_id 
        })
        .then(board => {
            res.sendStatus(201).json({ board })
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500); 
        }); 
}); 

// CREATE NEW TODO
router.post('/:boardid', jsonParser, (req, res) => {
    console.log('Board id', req.params.boardid)
    Board 
        .find({ where: { id: req.params.boardid }})
        .then(board => {
            res.status(200).json({ board })
        })
        .catch(err => {
            res.status(404).json({ message: 'No record with given id'}); 
            console.error(err); 
        }); 
}); 

// ADMIN - GET ALL BOARDS
router.get('/', (req, res) => {
    return Board
        .findAll()
        .then(boards => {
            res.status(200).json({ boards })
        })
        .catch(err => {
            console.log(err); 
            res.sendStatus(500)
        }); 
}); 

module.exports = { router }