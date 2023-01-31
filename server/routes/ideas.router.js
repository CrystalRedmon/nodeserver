let express = require('express');
let router = express.Router();
const axios = require('axios');





let sisters = {
    older: "chantel",
    middle: "tiffany",
    younger: "crystal"
}

const getSisterName = (sisterObject) => {

    for (const property in sisterObject) {
        console.log('My name is: ', property);
    }

};

console.log(getSisterName(sisters))

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

        const ideaByParticipant = await axios.get
            (`http://www.boredapi.com/api/activity${(participants > 0 ? `?participants = ${participants}` : ``)}`)

        res.send(ideaByParticipant.data);
        console.log('number of participants: ', participants, ideaByParticipant.data.participants);
    }
    catch (error) {
        res.sendStatus(500);
        console.log("It failed. Error: ", error);
    }

});







router.get('/bycriteria:criteria', async (req, res) => {

    let criteria = [];
    console.log('These are the params: ', req.params.criteria)
    const getCriteria = (reqbody) => {

        for (let [key, value] of Object.entries(reqbody)) {

            if (key === 'type' || 'participants' || 'accessibility' || 'price' || 'minprice' || 'maxprice' || 'minaccessibility' || 'maxaccessibility') {
                criteria.push(`${key}=${value}`); 
                console.log("this is the key/value pair: ", key, ":", value);
            }else{
                console.log('it did not work');
            }
            
        }

        criteria = criteria.join('&');
        return criteria;

    }

    try {
        getCriteria(req.params.criteria);
        
        let ideaByCriteria = await axios.get(`http://www.boredapi.com/api/activity?${criteria}`);
    
        res.send(ideaByCriteria.data);
        console.log('Results for search by criteria: ', criteria, ideaByCriteria.data)

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