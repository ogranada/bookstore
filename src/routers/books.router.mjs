import { Router } from 'express';
import { data } from '../database/db.mjs';
import { middlewarePaginaPrivada } from '../middlewares/privacy.middleware.mjs';



function miAtrapador(request, response) {
  console.log('==>', request.jajaja);
  response.json(data);
};

const creaLibro = (request, response) => {
  data.push(
    request.body
  );
  response.json(request.body);
};

export function getRouter() {
  const router = new Router();
  router.get('/books', miAtrapador);
  router.post('/books', middlewarePaginaPrivada, creaLibro);
  return router;
}
