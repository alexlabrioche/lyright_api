const express = require("express");
require("express-async-errors");

const {
  getSecretCode,
  getStupidPseudo,
} = require("../controllers/game_controller");

const { OK } = require("../helpers/status_code");

const router = express.Router();

router.get("/code", (request, response) => {
  const secretCode = getSecretCode();
  response.status(OK);
  response.json({ data: secretCode });
});

router.get("/pseudo", async (request, response) => {
  const pseudo = await getStupidPseudo();
  response.status(OK);
  response.json({ data: pseudo });
});

module.exports = router;
