let express = require('express');
let app = express();
let router = express.Router();
const axios = require('axios');




// get random activity
router.get('/', (req, res) => {

    axios.get('http://www.boredapi.com/api/activity/')
    .then((response) => {
        res.send(response.data.activity);
    }).catch(err => {
        res.sendStatus(500);
        console.log('GET ideas failed: ', err);
    });


    console.log('I\'m going to get all of the ideas!');
})


router.get('/byPrice', (req, res) => {

    axios.get(`http://www.boredapi.com/api/activity?minprice=.3&maxprice=1.0`)
    .then((response) => {
        res.send(response.data.activity);
    }).catch(err => {
        res.sendStatus(500);
        console.log('GET ideas failed: ', err);
    });


    console.log('Make it cheap');
})





module.exports = router