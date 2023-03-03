import './App.css';
import RandomActivity from '../RandomActivity/RandomActivity';
import ActivityByCriteria from '../ActitivyByCriteria/ActivityByCriteria';

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Don't Be Bored
        </h1>


      </header>
      <div className='header-border'></div>
      <main>
        <div id='main-container'>
          <RandomActivity />
          <ActivityByCriteria />
        </div>


      </main>

    </div>
  );
}

export default App;
