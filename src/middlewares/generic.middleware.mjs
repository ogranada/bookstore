
export function miPrimerMiddleware(request, response, next /* continuacion */) {
    request.jajaja = 'This is a Joke';
    next();
  }
  