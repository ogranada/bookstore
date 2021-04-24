import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  name: String,
  authors: [
    {
      name: String,
      lastname: String
    }
  ]
});

export function createModel() {
  return mongoose.model('books', bookSchema);
}
