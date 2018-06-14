const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const request = require('request');

const app = express()

const PORT = process.env.JAWS

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(PORT, err =>{
    if(err) console.error(err);
    else{console.log(`App listening on port ${PORT}`);}
});