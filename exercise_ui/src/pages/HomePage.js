import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';

function HomePage({ setExerciseToEdit }) {
  const [exercises, setExercises] = useState([]);
  const history = useHistory();

  const loadExercises = async () => {
    const response = await fetch('/exercises');
    const data = await response.json();
    setExercises(data);
  };

  const onDelete = async _id => {
    const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
    if (response.status === 204) {
      setExercises(exercises.filter(e => e._id !== _id));
    } else {
      console.error(
        `Failed to delete exercise with _id = ${_id}, status code = ${response.status}.`
      );
    }
  };

  const onEdit = exercise => {
    setExerciseToEdit(exercise);
    history.push('/edit-exercise')
  }

  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <>
      <h2>List Of Exercises</h2>
      <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}/>
    </>
  );
}

export default HomePage;
