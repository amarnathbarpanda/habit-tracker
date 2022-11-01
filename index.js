//getting all the libraries and modules
const express = require('express');
const app = express();
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');


const port = 8000;

app.use(express.urlencoded());
app.use(cookieParser());


//to access static files
app.use(express.static('./assets'));
// to use express layout
app.use(expressLayouts);



// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//use express router
app.use('/', require('./routes'));

// setting up views
app.set('view engine', 'ejs');
app.set('views', './views');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));

//accessing static files
app.use(express.static('assets'));



// listening to port
app.listen(port, (err) => {
    if (err) {
        console.log('Error in running server');
        return;
    }
    console.log('Server is running on port', port);
});