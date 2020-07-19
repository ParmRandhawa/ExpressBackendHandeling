const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const app = express();
const upload = multer();
const routes = require('./routes/routes.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(upload.array());

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/', routes);

app.listen(3000);