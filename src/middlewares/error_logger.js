/* eslint-disable no-console */
const errorLogger = (error, request, response, next) => {
  console.error(`${error.name}: ${error.title}\n  ${error.detail}`);
  next(error);
};

module.exports = errorLogger;
