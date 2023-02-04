import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGODB_CONNECT_STRING, { useNewUrlParser: true });

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once('open', () => {
  console.log('Successfully connected to MongoDB using Mongoose!');
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: String, required: true },
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model('Exercise', exerciseSchema);

const createExcercise = async requestObject => {
  const exercise = new Exercise({
    name: requestObject.name,
    reps: requestObject.reps,
    weight: requestObject.weight,
    unit: requestObject.unit,
    date: requestObject.date,
  });
  return exercise.save();
};

const findExercises = async filter => {
  const result = Exercise.find(filter);
  return result.exec();
};

const findExerciseById = async _id => {
  const query = Exercise.findById(_id);
  return query.exec();
};

const updateExercise = async (_id, jsonObject) => {
  const result = await Exercise.updateOne({ _id }, jsonObject);
  return result.modifiedCount;
};

const deleteExercise = async filter => {
  const result = await Exercise.deleteMany(filter);
  return result.deletedCount;
};

export {
  createExcercise,
  findExercises,
  findExerciseById,
  updateExercise,
  deleteExercise,
};
