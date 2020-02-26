const { NOT_FOUND } = require("../status_code");

module.exports = class NotFoundError extends Error {
  constructor(title, detail, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }

    this.name = "NotFoundError";
    this.status = NOT_FOUND;
    this.title = title;
    this.detail = detail;
  }
};
