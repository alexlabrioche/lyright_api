const { pick } = require("lodash");
const { User } = require("../models");
const createUserSchema = require("../validations/createUserSchema");
const { BadRequestError } = require("../helpers/errors");

const controller = {
  addNewUser: async (data) => {
    await createUserSchema
      .validate(data, {
        abortEarly: false,
      })
      .catch((errors) => {
        const schemaErrors = errors.inner.map((err) => ({
          field: err.path,
          message: err.message,
        }));
        throw new BadRequestError(
          "Erreur de validation de l'utilisateur",
          schemaErrors,
        );
      });
    const user = await User.create(data);
    return pick(user, ["id", "name", "email"]);
  },
};

module.exports = controller;
