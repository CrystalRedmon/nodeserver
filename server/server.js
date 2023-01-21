// Require express - gives us a function
const express = require('express');
// Create an instance of express by calling the function returned above - gives us an object
const app = express();
const port = 5000;

// use require to use modules
const quoteList = require('./public/modules/quoteList')


// express static file serving - public is the folder name
app.use(express.static('server/public'));



app.get('/quotes', (req, res) => {

    console.log('request for /quotes was made');
    res.status(200);
    res.send(quoteList);
})



// Start up our server
app.listen(port, () => {
  console.log('listening on port', port);
});