const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 
const jsonParser = bodyParser.json() 
const { Board, ToDo, Completed } = require('../models'); 


// CREATE NEW BOARD
router.post('/', jsonParser, (req, res) => {
    // authentication needed
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
    // authentication neeeded
    if(!req.body.value) {
        return res.status(404).json({ message: 'Must provide value'}); 
    }

    Board 
        .find({ where: { id: req.params.boardid }})
        .then(board => {
            if(!board) {
                return res.status(404).json({ message: 'No record with given id'}); 
            }
            return ToDo
                .create({value: req.body.value, board_id: board.id })
                .then(ToDo => {
                    res.status(201).json({ ToDo })
                }); 
        })
        .catch(err => {
            res.status(500).json({ message: 'There was a problem'}); 
            console.error(err); 
        }); 
}); 

// MOVE TODO TO COMPLETE 
router.post('/:boardid/todo', jsonParser, (req, res) => {
    // authentication neeeded
    if(!req.body.value) {
        return res.status(404).json({ message: 'Must provide value'}); 
    }  
    ToDo
        .destroy({ where: { board_id: req.params.boardid }})
        .then(todos => {
            if(!todos) {
                return res.status(404).json({ message: 'Value does not exist'});                 
            }
            return Completed
                .create({ value: req.body.value, board_id: req.params.boardid })
                .then(completed => {
                    res.sendStatus(204);
                })
                .catch(err => {
                    res.sendStatus(500).json({ message: 'There was a problem'}); 
                });
        })
        .catch(err => {
            res.sendStatus(500).json({ message: 'There was a problem'}); 
        }); 
}); 

// DELETE TODO
router.delete('/:boardid/todo', jsonParser, (req, res) => {
    // authentication neeeded
    if(!req.body.value) {
        return res.status(404).json({ message: 'Must provide value'}); 
    }
    ToDo
        .destroy({ where: { board_id: req.params.boardid, value: req.body.value }})
        .then(response => {
            if(!response) {
                return res.status(404).json({ message: 'Value does not exist'});                   
            }
            res.sendStatus(202); 
        })
        .catch(err => {
            res.sendStatus(500).json({ message: 'There was a problem'}); 
        }); 
}); 


// DELETE COMPLETE
router.delete('/:boardid/completed', jsonParser, (req, res) => {
    // authentication neeeded
    if(!req.body.value) {
        return res.status(404).json({ message: 'Must provide value'}); 
    }
    Completed
        .destroy({ where: { board_id: req.params.boardid, value: req.body.value }})
        .then(response => {
            if(!response) {
                return res.status(404).json({ message: 'Value does not exist'});                   
            }
            res.sendStatus(202); 
        })
        .catch(err => {
            res.sendStatus(500).json({ message: 'There was a problem'}); 
        }); 
}); 


// DELETE BOARD
router.delete('/:boardid', jsonParser, (req, res) => {
    console.log("BOARDID", req.params.boardid)
    Board 
        .destroy({ where: { id: req.params.boardid }})
        .then(response => {
            if(!response) {
                return res.status(404).json({ message: `Board id: ${req.params.boardid} does not exist`}); 
            }
            res.sendStatus(202); 
        })
        .catch(err => {
            console.log("ERROR", err)
            res.status(500).json({ message: "There was a problem"}); 
        }); 
}); 


// ADMIN - GET ALL BOARDS
router.get('/', (req, res) => {
    return Board
        .findAll({
            include: [{
                model: ToDo, 
                as: 'todos'
            }, 
            {
                model: Completed, 
                as: 'completed'
            }]
        })
        .then(boards => {
            res.status(200).json({ boards })
        })
        .catch(err => {
            console.log(err); 
            res.sendStatus(500)
        }); 
}); 

module.exports = { router }