const express = require('express');
const fs = require('fs/promises');
const router = express.Router();
const path = require('path');
const userService = require('../services/userService.js');

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../html/authorization.html'))
})

router.post('/', async (req, res) => {
    let authorizationReq = req.body

    if (authorizationReq.email == undefined || authorizationReq.email == '') {
        res.status(403).send('Поля ввода не могут быть пустыми')
        return
    }

    if (authorizationReq.password == undefined || authorizationReq.password == '') {
        res.status(403).send('Поля ввода не могут быть пустыми')
        return
    }

    let authorizedUser = await userService.getByLoginAndPasswod(authorizationReq.email, authorizationReq.password);
    if (authorizedUser != undefined) {
        res.send(authorizedUser);
    }
    else {
        res.status(403).send('Пользователь не найден')
    }
})

module.exports = router