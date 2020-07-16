const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const routes = require('./routes/routes.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/', routes);

app.listen(3000);