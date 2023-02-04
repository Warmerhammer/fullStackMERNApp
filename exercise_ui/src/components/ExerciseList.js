import React from 'react';
import Exercise from './Exercise';
import { Link } from 'react-router-dom';

function ExerciseList({ exercises, onDelete, onEdit }) {
  return (
    <table id="exercises">
      <thead>
        <tr>
          <th>Exercise</th>
          <th>Reps</th>
          <th>Weight</th>
          <th>Unit</th>
          <th>Date</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise, i) => (
          <Exercise
            exercise={exercise}
            onDelete={onDelete}
            onEdit={onEdit}
            key={i}
          />
        ))}
        <tr>
          <td colSpan="7">
            <Link to="/create-exercise">Add Exercise</Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ExerciseList;
