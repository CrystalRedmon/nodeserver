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


router.get('/byPrice', async (req, res) => {

    try {
        let minprice = req.body.minprice;
        let maxprice = req.body.maxprice;


        const ideaByPrice = await axios.get(`http://www.boredapi.com/api/activity?minprice=${minprice}&maxprice=${maxprice}`)

        console.log(`This is it ${minprice}, ${maxprice}`);
        res.send(ideaByPrice.data);
    }
    catch(error){
        res.sendStatus(500);
        console.log("It failed. Error: ", error);
    }

    // axios.get(`http://www.boredapi.com/api/activity?minprice=${minprice}&maxprice=${maxprice}`)
    //     .then((response) => {
    //         res.send(response.data);
    //     }).catch(err => {
    //         res.sendStatus(500);
    //         console.log('GET ideas failed: ', err);
    //     });


    console.log('Make it cheap');
})





module.exports = router