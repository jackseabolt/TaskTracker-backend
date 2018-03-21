'use strict'; 

const express = require('express'); 
const { User, Board } = require('../models');
const router = express.Router();
const bodyParser = require('body-parser'); 
const jsonParser = bodyParser.json()  

router.get('/', (req, res) => {
    return User
        .findAll({
            include: [{
                model: Board, 
                as: 'boards'
            }]
        })
        .then(users => res.status(200).json(users))
        .catch(err => {
            console.log(err); 
            res.sendStatus(500); 
        })
}); 

router.post('/', jsonParser, (req, res) => {
    return User
        .create({
            username: req.body.username, 
            password: req.body.password
        })
        .then(user => {
            res.status(201).json({ user })
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500); 
        })
});

module.exports = { router }