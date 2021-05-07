import { Router } from 'express';
import { createUser } from '../database/db.mjs';
import { authenticate } from '../middlewares/auth.middleware.mjs';

function usuarioLogueado(request, response) {
  response
    .status(202)
    .send({
      token:request.user.token
    });
}

async function createUserHandler(req, res) {
  if (!req.body) {
    return res.status(406).json({message: 'Invalid information'});
  }
  const user = await createUser({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    lastname: req.body.lastname
  })
  res
    .status(201)
    .send({
      ...user.toJSON(),
      password: undefined
    });
}

export function getRouter() {
  const router = new Router();
  router.post('/login', authenticate, usuarioLogueado);
  router.post('/register', createUserHandler);
  return router;
}