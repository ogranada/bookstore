import Sequelize from 'sequelize';
import { createModel as createUsersModel } from './user.mjs';
import { createModel as createRolModel } from './rol.mjs';
import { createModel as createAuthorsModel } from './author.mjs';
import { createModel as createBooksModel } from './book.mjs';

const DB_MODELS = {};
let DATABASE_REFERENCE = null;

export async function connect(params) {
  const {
    DB_PASS,
    DB_SCHEMA,
    DB_USERNAME,
    DB_HOST,
    DB_PORT,
    DB_NAME
  } = process.env;
  const AUTH = DB_USERNAME || DB_PASS
    ? `${DB_USERNAME}:${DB_PASS}@` 
    : '';
  const URL = `${DB_SCHEMA}://${AUTH}${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  console.log(URL);
  const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mariadb'
  });
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    DB_MODELS.Rol = createRolModel(sequelize);
    // await DB_MODELS.Rol.sync({ force: false });

    DB_MODELS.User = createUsersModel(sequelize);
    // await DB_MODELS.User.sync({ force: false });

    DB_MODELS.Author = createAuthorsModel(sequelize);
    // await DB_MODELS.Book.sync({ force: false });

    DB_MODELS.Book = createBooksModel(sequelize);
    // await DB_MODELS.Book.sync({ force: false });

    DB_MODELS.Rol.hasMany(DB_MODELS.User);
    DB_MODELS.User.belongsTo(DB_MODELS.Rol);

    DB_MODELS.Book.belongsToMany(DB_MODELS.Author, { through: 'authors_books'});
    DB_MODELS.Author.belongsToMany(DB_MODELS.Book, { through: 'authors_books'});

    await sequelize.sync({ force: false })
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

export async function validateUser(username, password) {
  /** @type {Sequelize.Model} */
  const Users = DB_MODELS.User;
  const user = await Users.findOne({
    where: {
      username: username,
      password: password
    }
  });
  if (user) {
    return user.toJSON();
  } else {
    return false;
  }
}

export async function getBooks(filter = {}) {
  /** @type {Sequelize.Model} */
  const Book = DB_MODELS.Book;
  return Book.findAll({
    where: filter,
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [DB_MODELS.Author]
  });
}

export async function createBook(bookInfo) {
  /** @type {mongoose.Model} */
  const Book = DB_MODELS.Book;
  const savedBook = await Book.create(bookInfo);
  return savedBook;
}

export async function updateBook(id, updateData) { 
  /** @type {mongoose.Model} */
  const Book = DB_MODELS.Book;
  const filter = { _id: id };
  await Book.findOneAndUpdate(filter, updateData);
  const doc = await Book.findById(id)
  return doc.toJSON()
}

export default {
  connect,
  validateUser
};