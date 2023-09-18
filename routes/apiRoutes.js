const express = require('express');
const fs = require('fs/promises');
const router = express.Router();
const path = require('path');
const notesService = require('../services/notesService.js');
const userService = require('../services/userService.js');

router.get('/users/:userID/notes', async (req, res) => {
    let userID = await userService.getUserByID(req.params.userID);
    if (userID == undefined) {
        res.status(403).send(JSON.stringify('Пользователь не найден'));
        return;
    }

    let userNotes = await notesService.getUserNotes(userID);
    res.json(userNotes);
})

router.post('/users/:userID/notes', async (req, res) => {
    let userID = await userService.getUserByID(req.params.userID);
    if (userID == undefined) {
        res.status(403).send(JSON.stringify('Пользователь не найден'));
        return;
    }

    let noteText = req.body.text;
    if (noteText == undefined || noteText == '') {
        res.status(403).send(JSON.stringify('Заметка не должна быть пустой'));
        return;
    }

    let noteID = await notesService.addUserNote(userID, noteText);
    res.json(noteID);
})

router.put('/users/:userID/notes/:noteID', async (req, res) => {
    let noteID = req.params.noteID;

    let text = req.body.text;
    if (text == undefined || text == '') {
        res.status(403).send(JSON.stringify('Заметка не должна быть пустой'));
        return;
    }

    let userID = await userService.getUserByID(req.params.userID);
    if (userID == undefined) {
        res.status(403).send(JSON.stringify('Пользователь не найден'));
        return;
    }

    let updated = await notesService.updateUserNote(userID, noteID, text);
    res.send(updated);
})

router.delete('/users/:userID/notes/:noteID', async (req, res) => {
    let noteID = req.params.noteID;

    let userID = await userService.getUserByID(req.params.userID);
    if (userID == undefined) {
        res.status(403).send(JSON.stringify('Пользователь не найден'));
        return;
    }
    let deleted = await notesService.deleteUserNote(userID, noteID);
    res.send(deleted);
})

module.exports = router