const { NotFoundError } = require('../helpers/errors');

// eslint-disable-next-line no-unused-vars
const notFoundHandler = (request, response, next) => {
  throw new NotFoundError(
    'Ressource introuvable.',
    "Désolé, nous n'avons pas trouvé la ressource demandée. Vérifiez l'URI et réessayez.",
  );
};

module.exports = notFoundHandler;
