import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

// custom jsonObject() builder
const Filter = {
  build: function (req) {
    for (const prop in req.body) {
      this[prop] = req.body[prop];
    }
  },
};

/**
 * Authenticator
 */
const requireAuthentication = (req, res, next) => {
  console.log('Authenticating...');
  // date format
  const format = /^\d\d-\d\d-\d\d$/;

  if (
    req.body.name === undefined ||
    typeof req.body.name !== 'string' ||
    req.body.name.length < 1
  ) {
    console.log('NameError');
    res.status(400).json({ Error: 'Invalid request' });
  } else if (
    req.body.reps === undefined ||
    isNaN(req.body.reps) ||
    req.body.reps < 1
  ) {
    console.log('RepsError');
    res.status(400).json({ Error: 'Invalid request' });
  } else if (
    req.body.weight === undefined ||
    isNaN(req.body.weight) ||
    req.body.weight < 1
  ) {
    console.log('WeightError');
    res.status(400).json({ Error: 'Invalid requst' });
  } else if (
    req.body.unit === undefined ||
    (req.body.unit !== 'lbs' && req.body.unit !== 'kgs')
  ) {
    console.log('UnitError');
    res.status(400).json({ Error: 'Invalid requst' });
  } else if (req.body.date === undefined || !format.test(req.body.date)) {
    console.log('DateError');
    res.status(400).json({ Error: 'Invalid request' });
  } else {
    // if all tests pass proceed with new entry
    console.log('Authenticated successfully');
    next();
  }
};

/**
 * Create a new exercise with the name, reps, weight, unit, and date provided in the body
 */
app.post('/exercises', requireAuthentication, (req, res) => {
  const jsonObject = new Filter.build(req);
  exercises
    .createExcercise(jsonObject)
    .then(exercise => {
      res.status(201).json(exercise);
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ Error: 'Request Failed' });
    });
});

/**
 * Retrieve the exercise corresponding to the filterObject.
 */
app.get('/exercises', (_, res) => {
  const filterObject = {};
  exercises
    .findExercises(filterObject)
    .then(exercises => {
      res.status(200).json(exercises);
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ Error: 'Request Failed' });
    });
});

/**
 * Retrieve exercises corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
  exercises
    .findExerciseById(req.params._id)
    .then(exercise => {
      if (exercise) {
        res.status(200).json(exercise);
      } else {
        res.status(404).json({ Error: 'Not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ Error: 'Request failed' });
    });
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its content to the values provided in the body.
 * Includes authentication.
 */
app.put('/exercises/:_id', requireAuthentication, (req, res) => {
  const jsonObject = new Filter.build(req);
  exercises
    .updateExercise(req.params._id, jsonObject)
    .then(numUpdated => {
      if (numUpdated === 1) {
        res.status(200).json({
          _id: req.params._id,
          jsonObject,
        });
      } else {
        res.status(404).json({ Error: 'Not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ Error: 'Request Failed.' });
    });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
  const deleteFilter = { _id: req.params._id };
  exercises
    .deleteExercise(deleteFilter)
    .then(deletedCount => {
      if (deletedCount === 1) {
        res.status(204).json();
      } else {
        res.status(404).json({ Error: 'Not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ Error: 'Request Failed' });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

export default app;
