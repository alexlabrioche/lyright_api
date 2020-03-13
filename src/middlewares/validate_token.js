const UnauthorizedError = require("../helpers/errors/401_unauthorized");
const admin = require("../config/firebase");

module.exports = {
  validateToken: async (req, res, next) => {
    const idToken = req.headers.authorization;
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      if (decodedToken) {
        return next();
      }
      throw new UnauthorizedError("oups");
    } catch (error) {
      throw new UnauthorizedError(error.message);
    }
  },
};
