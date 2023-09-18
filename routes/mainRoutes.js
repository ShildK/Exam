const express = require('express');
const fs = require('fs/promises');
const router = express.Router();
const path = require('path');
const notesService = require('../services/notesService.js');
const { log } = require('console');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/main.html'))
})


module.exports = router