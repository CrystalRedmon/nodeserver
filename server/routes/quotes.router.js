let express = require('express');
let router = express.Router();
let quotes = require('../public/modules/quoteList');




router.get('/',(req, res) => {

    console.log('request for /quotes was made');
    res.status(200);
    res.send(quotes);
})



router.get('/',(req, res) => {

    console.log('request for /quotes was made');
    res.status(200);
    res.send(quotes);
})






router.post('/', (req, res)=>{
    let quote = req.body
    console.log('this is the req.body: ', quote);
    quotes.push(quote);
    res.send({message: 'Successfully added quote'});
    
    
})







module.exports = router;