// const express = require('express');
import helmet from "helmet";
import express, { json, urlencoded } from 'express';
import swaggerUIE from 'swagger-ui-express';
import {readSync} from "node-yaml"
import { getRouter as getBooksRouter } from "./routers/books.router.mjs";
import { miPrimerMiddleware } from "./middlewares/generic.middleware.mjs";

function loadMiddlewares(app) {
  app.use(helmet());
  app.use(express.static('public'));
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(miPrimerMiddleware);
  
  const swaggerData = readSync('./swagger.yml'); // leo un yaml
  app.use('/api-docs', swaggerUIE.serve); // preparo el serv. de swagger
  app.get('/api-docs', swaggerUIE.setup(swaggerData)); // defino endpoint para documentación
}

function loadRouters(app) {
  const booksRouter = getBooksRouter();
  app.use('/api/1.0.0', booksRouter)
}

function main() {
  const app = express();
  loadMiddlewares(app);
  loadRouters(app);
  app.listen(3000, () => console.log('Server is ready...'));
}

main();
