import { useState } from "react";
import axios, * as others from 'axios';
import Swal from 'sweetalert2';

// DESIGN DESKTOP VERSION


function ActivityByCriteria() {

  const [activity, setActivity] = useState('');
  const [criteria, setCriteria] = useState({
    type: '',
    participants: '',
    price: '',
    minprice: '',
    maxprice: ''
  });

  const getPriceCriteria = (evt) => {
    if (evt.target.value === '0') {
      setCriteria({ ...criteria, price: '0', minprice: '', maxprice: '' });
    } else if (evt.target.value === '.1-0.7') {
      setCriteria({ ...criteria, price: '', minprice: '.1', maxprice: '.7' });
    } else {
      setCriteria({ ...criteria, price: '', minprice: '.8', maxprice: '1.0' });
    }

    return criteria
  }

  const getActivityByCriteria = (evt) => {
    evt.preventDefault();

    // new URLSearchParams creates a search param object and creates a string
    const params = new URLSearchParams(criteria)
    const criteriaArray = Object.values(criteria);
    let checkCriteriaForStrings = criteriaArray.every(eachCriteria => { return eachCriteria === '' });

    console.log('checking', checkCriteriaForStrings, criteria);

    if (checkCriteriaForStrings === true) {

      Swal.fire('Please select at least one criteria.', '', 'error');
      // alert('Please select at least one criteria OR select a random activity.')
    } else {
      axios.get(`/ideas/bycriteria${params}`)
        .then(response => {
          if (!response.data.activity) {
            setActivity('Sorry, can\'t find any matches. Try swicthing things up.');
          } else {
            console.log('This is the criteria response: ', response.data.activity);
            setActivity(response.data.activity);
          }
        })
        .catch(error => {
          console.log('Unable to get byCriteria: ', error);
        })
    }
  }

  function resetCriteria() {
    setCriteria({
      type: '',
      participants: '',
      price: '',
      minprice: '',
      maxprice: ''
    });

    setActivity('');
    
    console.log('activity: ', activity, 'criteria', criteria);

  }




  return (<>
<div className='header-border short'></div>
<div className='container'>
    <h2>Activity By Criteria</h2>
    <div className="criteria-container">
      
      <form onSubmit={getActivityByCriteria}>
        <label>Activity Type: </label>
        <select onChange={evt => setCriteria({ ...criteria, type: evt.target.value })} name='type' id='type'>
          <option value=''>Select Type</option>
          <option value='busywork'>Busywork</option>
          <option value='charity'>Charity</option>
          <option value='cooking'>Cooking</option>
          <option value='diy'>DIY</option>
          <option value='education'>Education</option>
          <option value='music'>Music</option>
          <option value='recreational'>Recreational</option>
          <option value='relaxation'>Relaxation</option>
          <option value='social'>Social</option>
        </select>
        <br></br>

        <label htmlFor='participantsInput'># of Participants (1-10): </label>
        <input onChange={evt => setCriteria({ ...criteria, participants: evt.target.value })} type='number' id='participantsInput' min='1' max='10'></input>
        <br></br>

        <fieldset onClick={getPriceCriteria}
          className='border-0'>

          <legend>Select Price:</legend>
          <div id='input-container'>
            <div>
              <label htmlFor='free' >Free 99!</label>
              <input type='radio' id='free' name='priceInput' value='0'>
              </input>
            </div>

            <div><label htmlFor='affordable'>Affordable</label>
              <input type='radio' id='affordable' name='priceInput' value='.1-0.7' >
              </input></div>

            <div><label htmlFor='expensive'>Expensive </label>
              <input type='radio' id='expensive' name='priceInput' value='.8-1'>
              </input>
            </div>
          </div>
        </fieldset>
        <br></br>

        <div className="button-container">
          <button type='submit'>
            Get Activity
          </button >

          <button type='reset' onClick={resetCriteria}>
            Clear Criteria
          </button>

        </div>

      </form>

      <div>
        {activity ? <p id="criteria-result">{activity}</p> : <p>Results Go Here</p>}
      </div>

    </div>

    </div>

  </>)
}

export default ActivityByCriteria;