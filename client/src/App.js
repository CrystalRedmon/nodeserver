import './App.css';
import axios, * as others from 'axios';
import { useState } from 'react';

function App() {

  const [activity, setActivity] = useState('');

  const [type, setType] = useState('');
  const [criteria, setCriteria] = useState({
    type: '',
    participants: '',
    accessibility: '',
    price: ''
  });

  const handleOnClick = () => {
    console.log('inside handleOnClick');

    axios.get('/ideas')
      .then(response => {
        console.log('this is the response: ', response.data);
        setActivity(response.data)
      })
      .catch(error => {
        console.log('Get did not work. Error: ', error);
      })

  }

  const getPriceCriteria = (evt) => {

    if (evt.target.value === '0') {
      setCriteria({ ...criteria, price: '0', minprice: '', maxprice: '' });
    } else if (evt.target.value === '.1-0.7') {
      setCriteria({ ...criteria, price: '0', minprice: '.1', maxprice: '.7' });
    } else {
      setCriteria({ ...criteria, price: '0', minprice: '.8', maxprice: '1.0' });
    }
    return criteria
  }

  const getAccessibilityCriteria =(evt)=>{

    if (evt.target.value ==='0'){
      setCriteria({...criteria, accessibility: '0'});
    }else if (evt.target.value === '.1-.7'){
      setCriteria({...criteria, minaccessibility: '.1', maxaccessibility: '.7'})
    }else{
      setCriteria({...criteria, minaccessibility: '.8', maxaccessibility: '1'});
    }
    return criteria;
  }


  // new URLSearchParams creates a search param object and creates a string
  const params = new URLSearchParams(criteria)

  const getActivityByCriteria = (evt) => {
    evt.preventDefault();
    console.log('Getting criteria', criteria);

    axios.get(`/ideas/bycriteria${params}`)
      .then(response => {
        console.log('This is the criteria response: ', response.data);
        setActivity(response.data);
      })
      .catch(error => {
        console.log('Unable to get byCriteria: ', error);
      })

  }



  return (
    <div className="App">
      <header className="App-header">
        <p>
          Don't Be Bored
        </p>
      </header>

      <main>

        <button onClick={handleOnClick}>
          Select Random Activity
        </button>

        <br></br>
        <br></br>

        <form onSubmit={getActivityByCriteria}>
          <label>Search For: </label>
          <select onChange={evt => setCriteria({ ...criteria, type: evt.target.value })} name='type' id='type'>
            <option value=''>Please Choose An Activity Type</option>
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

          <label htmlFor='participantsInput'>Number of Participants: </label>
          <input onChange={evt => setCriteria({ ...criteria, participants: evt.target.value })} type='number' id='participantsInput' min='1' max='10'></input>
          <br></br>

          <fieldset onChange={getPriceCriteria}>

            <legend>Select Price</legend>
            {/* /// TODO- REMOVE BORDER  */}
            <input type='radio' name='priceInput' value='0'>
            </input>
            <label htmlFor='priceInput'>Free 99!</label>

            <input type='radio' name='priceInput' value='.1-0.7' >
            </input>
            <label htmlFor='priceInput'>Affordable</label>

            <input type='radio' name='priceInput' value='.8-1'>
            </input>
            <label htmlFor='priceInput'>Expensive </label>


          </fieldset>
          <br></br>


          <fieldset onChange={getAccessibilityCriteria}>
            <legend>Accesibility Rating</legend>

            <input type='radio' name='accessibility' value='0'></input>
            <label htmlFor='notAccessible' >Not Accessible</label>

            <input type='radio' name='accessibility' value='.1-0.7'></input>
            <label htmlFor='somewhatAccessible' >Minimal Accesibility</label>

            <input type='radio' name='accessibility' value='.8-1' ></input>
            <label htmlFor='fullyAccessible' >Full Accessibility</label>




          </fieldset>



          <button type='submit'>
            Get Activity
          </button >
        </form>


        <div>
          {activity.activity ? <p>{activity.activity}</p> : <p>Results Go Here</p>}
        </div>

      </main>






    </div>
  );
}

export default App;
