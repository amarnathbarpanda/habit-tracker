// get mongoose 
const mongoose = require('mongoose');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/habit_tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//acquire the connection to check if it is successful
const db = mongoose.connection;

//Error
db.on('error', () => {
    console.log('Error connecting to db');
});

//up and running then print the message
db.once('open', () => {
    console.log('Connected to db successfully');
})

