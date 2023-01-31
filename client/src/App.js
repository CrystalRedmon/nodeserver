import './App.css';
import axios, * as others from 'axios';
import { useState } from 'react';

function App() {

  const [activity, setActivity] = useState('');

  const [type, setType] = useState('');


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

  const getActivityByCriteria = (evt) => {
    evt.preventDefault();

    console.log('Getting Activity', type);


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
          <select onChange={evt => setType(evt.target.value)} name='type' id='type'>
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
          <button type='submit'>
            Get Activity
          </button >
        </form>


        <div>
          {activity ? <p>{activity}</p> : <p>Results Go Here</p>}
        </div>

      </main>






    </div>
  );
}

export default App;
