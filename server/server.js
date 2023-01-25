// Require express - gives us a function
const express = require('express');
// Create an instance of express by calling the function returned above - gives us an object
const app = express();
const port = 5000;
const quotes = require('./public/modules/quoteList')

let quotesRouter = require('../server/routes/quotes.router');
// bodyParser decodes the http request from the client
let bodyParser = require('body-parser');
app.use(bodyParser.json());


// app.use('/quotes', quotesRouter);
app.use(bodyParser.urlencoded({ extended: true }));
// express static file serving - public is the folder name
app.use(express.static('server/public'));




app.get('/quotes', (req, res) => {

    console.log('request for /quotes was made');
    res.status(200);
    res.send(quotes);
})

app.post('/quotes', (req, res)=>{
    let quote = req.body
    console.log('this is the req.body: ', quote);
    quotes.push(quote);
    res.send({message: 'Successfully added quote'});
    
    
})







// Start up our server
app.listen(port, () => {
  console.log('listening on port', port);
});

