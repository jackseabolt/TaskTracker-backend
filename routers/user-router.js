'use strict'; 

const express = require('express'); 
const { User, Board, ToDo, Completed } = require('../models');
const bcrypt = require('bcryptjs')
const router = express.Router();
const bodyParser = require('body-parser'); 
const jsonParser = bodyParser.json()  

// CREATE USER
router.post('/', jsonParser, (req, res) => {
    return bcrypt.hash(req.body.password, 10)
        .then(hash => {
            return User
            .create({
                username: req.body.username, 
                password: hash
            })
            .then(user => {
                res.status(201).json({ user })
            })
            .catch(err => {
                console.log(err)
                res.sendStatus(500); 
            })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'There was a problem'}); 
        })
    
});

// GET USER DATA
router.get('/:userId', jsonParser, (req, res) => {
    return User
        .find({ where: { id: req.params.userId}, 
            include: [{
                model: Board, 
                as: 'boards', 
                include: [{
                    model: ToDo, 
                    as: 'todos'
                },
                {
                    model: Completed, 
                    as: 'completed'
                }]
            }
        ]
        })
        .then(user => {
            if(!user) {
                return res.status(404).json({ message: 'Invalid user id'}); 
            }
            let result = user.apiRepr(); 
            result.boards = user.boards
            res.status(200).json( result ); 
        })
        .catch(err => {
            res.status(500).json({ message: 'There was a problem'})
        }); 
}); 

// DELETE A USER
router.delete('/:userId', jsonParser, (req, res) => {
    return User
        .destroy({ where: { id: req.params.userId }})
        .then(response => {
            if(!response) {
                return res.status(404).json({ message: 'Id does not exist'});                   
            }
            res.sendStatus(202)
        })
        .catch(err => {
            console.error(err); 
            res.status(500).json({ message: 'There was a problem' })
        });
}); 

// UPDATE A USER
router.put('/:userId', jsonParser, (req, res) => {
    if(req.body.username && req.body.password ) {
        return User
            .update(
                { 
                    username: req.body.username,
                    password: req.body.password
                },
                {
                    where: { id: req.params.userId }
                }
            )
            .then(user => {
                if(!user) {
                    return res.status(404).json({ message: 'Invalid user id' });
                }
                res.sendStatus(202); 
            })
            .catch(err => {
                console.error(err); 
                res.status(500).json({ message: 'There was a problem' })
            });
    } 
    else if (req.body.username) {
        return User
        .update(
            { 
                username: req.body.username
            },
            {
                where: { id: req.params.userId }
            }
        )
        .then(user => {
            if(!user) {
                return res.status(404).json({ message: 'Invalid user id' });
            }
            res.sendStatus(202); 
        })
        .catch(err => {
            console.error(err); 
            res.status(500).json({ message: 'There was a problem' })
        });
    } 
    else if (req.body.password) {
        return User
        .update(
            { 
                password: req.body.password
            },
            {
                where: { id: req.params.userId }
            }
        )
        .then(user => {
            if(!user) {
                return res.status(404).json({ message: 'Invalid user id' });
            }
            res.sendStatus(202); 
        })
        .catch(err => {
            console.error(err); 
            res.status(500).json({ message: 'There was a problem' })
        });
    }  
    else {
        res.status(404).json({ message: 'Must provide update data' });
    }
}); 

// ADMIN - GET ALL USERS
router.get('/', (req, res) => {
    return User
        .findAll({
            include: [{
                model: Board, 
                as: 'boards',
                include: [{
                    model: ToDo, 
                    as: 'todos'
                },
                {
                    model: Completed, 
                    as: 'completed'
                }]
            }
        ]
        })
        .then(users => {
            let result = users.map(user => {
                let item = user.apiRepr(); 
                item.boards = user.boards;
                return item; 
            })
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err); 
            res.sendStatus(500); 
        })
}); 

module.exports = { router }