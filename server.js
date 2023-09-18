const express = require('express');
const fs = require('fs/promises');
const path = require('path');
let app = express();

const routesReg = require('./routes/registrationRoutes');
const routesAuth = require('./routes/authorizationRoutes');
const routesMain = require('./routes/mainRoutes');
const routesApi = require('./routes/apiRoutes');
const src = require('./services/fileService');

const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/registration', routesReg);
app.use('/authorization', routesAuth);
app.use('/main', routesMain);
app.use('/api', routesApi);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'html/error_page.html'))
})

app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));