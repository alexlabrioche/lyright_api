const BadRequestError = require("./400_bad_request");
const UnauthorizedError = require("./401_unauthorized");
const NotFoundError = require("./404_not_found");

module.exports = {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
};
