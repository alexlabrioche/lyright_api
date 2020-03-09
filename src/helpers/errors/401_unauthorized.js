const { UNAUTHORIZED } = require("../status_code");

module.exports = class UnauthorizedError extends Error {
  constructor(title, detail, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
    }
    this.name = "UnauthorizedError";
    this.status = UNAUTHORIZED;
    this.title = title;
    this.detail = detail;
  }
};
