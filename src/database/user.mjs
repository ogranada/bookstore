import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  username: String,
  password: String,
  email: String,
  rol: String
});

export function createModel() {
  return mongoose.model('users', userSchema);
}
