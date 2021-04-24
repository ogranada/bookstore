import mongoose from 'mongoose';
import { createModel as createUsersModel } from './user.mjs';
import { createModel as createBooksModel } from './book.mjs';

const DB_MODELS = {};
let DATABASE_REFERENCE = null;

export async function connect(params) {
  const {
    DB_PASS,
    DB_SCHEMA,
    DB_USERNAME,
    DB_AUTHORITY,
    DB_NAME
  } = process.env;
  const URL = `${DB_SCHEMA}://${DB_USERNAME}:${DB_PASS}@${DB_AUTHORITY}/${DB_NAME}`;
  mongoose.connect(URL, {
    useNewUrlParser: true, useUnifiedTopology: true
  });
  return new Promise((resolve, reject) => {
    DATABASE_REFERENCE = mongoose.connection;
    DATABASE_REFERENCE.on('error', (error) => {
      console.error('connection error:', error);
      reject(error);
    });
    DATABASE_REFERENCE.once('open', function() {
      DB_MODELS.User = createUsersModel();
      DB_MODELS.Book = createBooksModel();
      resolve(DATABASE_REFERENCE);
    });
  });
}


export async function validateUser(username, password) {
  /** @type {mongoose.Model} */
  const Users = DB_MODELS.User;
  const user = await Users.findOne({
    username: username,
    password: password
  }).exec();
  if (user) {
    return user.toJSON();
  } else {
    return false;
  }
}

export async function getBooks(filter = {}) {
  /** @type {mongoose.Model} */
  const Book = DB_MODELS.Book;
  return Book.find(filter).exec();
}

export async function createBook(bookInfo) {
  /** @type {mongoose.Model} */
  const Book = DB_MODELS.Book;
  const newBook = Book.create(bookInfo);
  const savedBook = await newBook.save();
  return savedBook.toJSON();
}

export default {
  connect,
  validateUser
};