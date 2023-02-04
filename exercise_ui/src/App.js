import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';
import { GiWeightLiftingUp } from 'react-icons/gi';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Exercise Tracker</h1>
        <p className="description">Keep track of your exercises</p>
        <GiWeightLiftingUp className="weightLiftingIcon" />
      </header>
      <Router>
        <div className="navigationComponent">
          <Navigation  />
        </div>
        <Route path="/" exact>
          <HomePage setExerciseToEdit={setExerciseToEdit} />
        </Route>
        <Route path="/edit-exercise">
          <EditExercisePage exerciseToEdit={exerciseToEdit} />
        </Route>
        <Route path="/create-exercise">
          <CreateExercisePage />
        </Route>
      </Router>

      <footer>© 2022 Richard O'Donnell</footer>
    </div>
  );
}

export default App;
