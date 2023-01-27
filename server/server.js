// Require express - gives us a function
const express = require('express');
// Create an instance of express by calling the function returned above - gives us an object
const app = express();
const port = 5000;


let quotesRouter = require('../server/routes/quotes.router');
let ideasRouter = require('../server/routes/ideas.router');


// bodyParser decodes the http request from the client
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/quotes', quotesRouter);
app.use('/ideas', ideasRouter);

// express static file serving - public is the folder name
app.use(express.static('server/public'));







// Start up our server
app.listen(port, () => {
  console.log('listening on port', port);
});

