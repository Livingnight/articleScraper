const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const path = require('path');
const htmlRoutes = require('./routes/htmlRoutes.js');
const apiRoutes = require('./routes/apiRoutes');


const app = express();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articles_db";
mongoose.Promise = Promise;

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(htmlRoutes);
app.use(apiRoutes);
mongoose.connect(MONGODB_URI);
    // , err =>{
    // if(err) console.error(err);
    // else {console.log(`Database connnected!`);}
// });
app.listen(PORT, err => {

    if (err) console.error(err);
    else {
        console.log(`App listening on port ${PORT}`);
    }
});

