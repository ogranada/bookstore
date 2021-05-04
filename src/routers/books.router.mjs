import rateLimit from 'express-rate-limit';
import { Router } from 'express';
import { getBooks, createBook } from '../database/db.mjs';
import { validateToken } from '../middlewares/auth.middleware.mjs';


// import { middlewarePaginaPrivada } from '../middlewares/privacy.middleware.mjs';

/**
 const limiter = rateLimit({
   windowMs: 60 * 1000, // una hora
   max: 50000 // limit each IP to 100 requests per windowMs
 });
 
function miAtrapadorAutor(request, response) {
  console.log('==>', request.jajaja);
  response.json(data);
};


*/

async function getBooksHandler(request, response) {
  const books = await getBooks();
  response.json(books);
};

async function getBookHandler(request, response) {
  const books = await getBooks({_id: request.params.id});
  response.json(books);
};

const creaLibro = async (request, response) => {
  const data = await createBook(
    request.body
  );
  response.json(data);
};

export function getRouter() {
  const router = new Router();
  router.get('/', getBooksHandler);
  router.post('/', creaLibro);
  router.get('/:id', validateToken, getBookHandler);
  // router.get('/autor', limiter, miAtrapadorAutor);
  return router;
}
