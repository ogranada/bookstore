import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.mjs';

function usuarioLogueado(request, response) {
  response
    .status(202)
    .send({
      token:request.user.token
    });
}

export function getRouter() {
  const router = new Router();
  router.post('/login', authenticate, usuarioLogueado);
  return router;
}