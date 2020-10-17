import React from 'react';
import ClockComponent from './components/clock'
import Canvas from './components/canvas'
import AddChallengers from './components/addContestants'

function App() {
  return (
    <div className="App">
      <div className="contentBox">
        <h1><ClockComponent className ="clock"></ClockComponent></h1>
        <Canvas></Canvas>
        <AddChallengers></AddChallengers>
        <div className="schedule">
        <h1>Remote Game Jam 2020</h1>
        <h2>Schedule</h2>
        <div>
          <h3>Friday</h3>
          <p>17.00: Start</p>
          <h3>Saturday</h3>
          <p>12.00: Coffee</p>
          <p>18.00: Coffee</p>
          <h3>Sunday</h3>
          <p>13.00: Judgement</p>
        </div>
        <h2>Theme: Overly Social</h2>
        <h2>Extra Points:</h2>
        <p>Multiplayer</p>
        <p>Teaser</p>
        </div>
        
      </div>

    </div>
  );
}


export default App;
