
export function middlewarePaginaPrivada(request, response, next) {
  if (request.headers.authorization === 'Bearer mimamamemimamemimamimama') {
    next();
  } else {
    response.status(403).send('Usted no puede acceder a este lugar.')
  }
}
