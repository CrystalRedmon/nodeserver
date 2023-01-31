import './App.css';
import axios, * as others from 'axios';
import {useState} from 'react';

function App() {

const [activity, setActivity]=useState('');


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

        <div>
         {activity ? <p>{activity}</p> : <p>Results Go Here</p>}
        </div>

      </main>






    </div>
  );
}

export default App;
