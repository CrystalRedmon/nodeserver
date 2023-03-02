import { useState } from "react";
import axios, * as other from 'axios';

function RandomActivity() {

    const [randomActivity, setRandomActivity] = useState('');

    //get random activity
    const handleOnClick = () => {
        axios.get('/ideas')
            .then(response => {
                console.log('this is the response: ', response.data);
                setRandomActivity(response.data)
            })
            .catch(error => {
                console.log('Get did not work. Error: ', error);
            })
    }

    return (<>

        
            <div className='header-border'></div>
           <div className='container'> 
            <h2>Random Activity</h2>
            <div className="random-container">
                <button onClick={handleOnClick}>
                    Select Random Activity
                </button>

                <div className='random-result'>
                    {randomActivity ? <p>{randomActivity}</p> : <p>Results Go Here</p>}
                </div>
            </div>
        </div>
    </>)
}

export default RandomActivity;