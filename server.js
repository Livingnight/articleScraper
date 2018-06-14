const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const request = require('request');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/htmlRoutes.js');


const app = express();

const MONGODB_URI = process.env.MONGDB_URI || "mongodb://localhost/articles_db";
mongoose.Promise = Promise;

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(routes);
mongoose.connect(MONGODB_URI, err =>{
    if(err) console.error(err);
    else {console.log(`Database connnected!`);}
});
app.listen(PORT, err => {

    if (err) console.error(err);
    else {
        console.log(`App listening on port ${PORT}`);
    }
});

