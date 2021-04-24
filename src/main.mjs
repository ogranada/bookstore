// const express = require('express');
import helmet from "helmet";
import dotenv from "dotenv";
import express, { json, urlencoded } from 'express';
// const rateLimit = require("express-rate-limit");
import rateLimit from 'express-rate-limit';
import swaggerUIE from 'swagger-ui-express';
import {readSync} from "node-yaml"
import { getRouter as getBooksRouter } from "./routers/books.router.mjs";
import { getRouter as getAuthRouter } from "./routers/auth.router.mjs";
import { miPrimerMiddleware } from "./middlewares/generic.middleware.mjs";
import database from "./database/db.mjs";

function loadMiddlewares(app) {

  const limiter = rateLimit({
    windowMs: 360000000,
    max: 1000 // limit each IP to 100 requests per windowMs
  });

  app.use(limiter);

  app.use(helmet.hidePoweredBy());
  app.use(helmet.xssFilter());
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
  const authRouter = getAuthRouter();
  app.use('/api/1.0.0/auth', authRouter);
  app.use('/api/1.0.0/books', booksRouter);
}

async function main() {
  console.log('Application started...');
  dotenv.config();
  console.log('Environment variables loaded...');
  console.log('Connecting to database...');
  const db = await database.connect();
  console.log('Database OK...');
  const app = express();
  loadMiddlewares(app);
  loadRouters(app);
  app.listen(3000, () => console.log('Server is ready...'));
}

main();
