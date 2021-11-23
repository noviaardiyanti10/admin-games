const express = require('express');
const app = express();
const path = require('path');
const logger = require('./middleware/logger');
const session = require("express-session");
const flash = require('connect-flash');

const router = require('./routes/router');
const { PORT = 4000 } = process.env;

app.use(session({
    secret: 'secretToken',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

// app.use(alerts);
//set view engine
app.use(express.static(path.join(__dirname, "/public/")));
app.set('view engine', 'ejs');




//set body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

app.use(router);


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));