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


router.get('/bycriteria:criteria', async (req, res) => {
    let criteria = req.params.criteria;

    try {
        let ideaByCriteria = await axios.get(`http://www.boredapi.com/api/activity?${criteria}`);

        let noActivity = Object.hasOwn(ideaByCriteria, 'error');
        if (noActivity) {
            res.send('Try Again');
        } else {
            res.send(ideaByCriteria.data);
            console.log('Results for search by criteria: ', ideaByCriteria.data)

        }


    } catch (error) {
        console.log("This is the error: ", error);

    }

})




// allow user to select from any number of criteria
// add react frontend
// use a css library to style
// post on LI
// create ReadMe


// move on to another api that uses an api key, Google API 









module.exports = router




