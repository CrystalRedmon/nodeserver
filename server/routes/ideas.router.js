let express = require('express');
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
        let type = req.body.type;
        let price = req.body.price;
        let accessibility = req.body.accessibility;
        let participants = req.body.participants; 

        const ideaByPrice = await axios.get(`http://www.boredapi.com/api/activity?minprice=${minprice}&maxprice=${maxprice}`)
        
        const ideaByType = await axios.get(`http://www.boredapi.com/api/activity?type=${type}&minprice=${minprice}&maxprice=${maxprice}&participants=${participants}`);

        const ideaByParticipant = await axios.get(`http://www.boredapi.com/api/activity?participants=${participants}`)

        res.send([ideaByPrice.data, ideaByType.data, ideaByParticipant.data]);
    }
    catch(error){
        res.sendStatus(500);
        console.log("It failed. Error: ", error);
    }


})

// allow user to select from any number of criteria
// add react frontend
// use a css library to style
// post on LI
// create ReadMe


// move on to another api that uses an api key, Google API 



module.exports = router