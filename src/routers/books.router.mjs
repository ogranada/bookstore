import { Router } from 'express';
import { data } from '../database/db.mjs';
import { middlewarePaginaPrivada } from '../middlewares/privacy.middleware.mjs';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60 * 1000, // una hora
  max: 5 // limit each IP to 100 requests per windowMs
});

function miAtrapador(request, response) {
  console.log('==>', request.jajaja);
  response.json(data);
};

function miAtrapadorAutor(request, response) {
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
  router.get('/', miAtrapador);
  router.post('/', middlewarePaginaPrivada, creaLibro);
  router.get('/autor', limiter, miAtrapadorAutor);
  return router;
}
