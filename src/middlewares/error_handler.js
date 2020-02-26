const { SERVER_ERROR } = require("../helpers/status_code");

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, _, response, next) => {
  const { status, title, detail } = error;

  if (!status) {
    response.status(SERVER_ERROR);
    response.json({
      titre: "Oups ! Quelque chose ne fonctionne pas !",
      description:
        "Le serveur rencontre un problème inconnu. Veuillez réessayer plus tard.",
    });
  }

  response.status(status);
  response.json({
    titre: title,
    description: detail,
  });
};

module.exports = errorHandler;
