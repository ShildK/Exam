const express = require('express');
const fs = require('fs/promises');
const router = express.Router();
const path = require('path');
const userService = require('../services/userService.js');
const { log } = require('console');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/registration.html'))
})

router.post('/', async (req, res) => {
    if(req.body.name == '' || req.body.email == '' || req.body.password == ''){
        res.status(403).send('Поля ввода не могут быть пустыми');
        return
    }

    let isNewEmail = await userService.checkEmail(req.body.email);
    if (isNewEmail == false) {
        res.status(403).send('Данный email уже зарегистрирован');
        return
    }

    if(req.body.password.length < 6){
        res.status(403).send('Пароль не может быть короче 6-ти символов');
        return
    }

    let userId = await userService.createUser(req.body)
    if (userId != undefined) {
        res.send(JSON.stringify(userId))
    }
    else{
        res.status(403).send('Возникла ошибка при регистрации')
    }
})

module.exports = router