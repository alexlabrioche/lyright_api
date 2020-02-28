const { BAD_REQUEST } = require("../status_code");

module.exports = class BadRequestError extends Error {
  constructor(title, detail, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }
    this.name = "BadRequestError";
    this.status = BAD_REQUEST;
    this.title = title;
    this.detail = detail;
  }
};
