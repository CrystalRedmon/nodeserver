import './App.css';
import axios, * as others from 'axios';
import { useState } from 'react';
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

      <main>

        <RandomActivity />
        <ActivityByCriteria />

      </main>

    </div>
  );
}

export default App;
