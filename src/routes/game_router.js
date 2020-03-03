const express = require("express");
require("express-async-errors");

const {
  getStupidPseudo,
  initNewGame,
} = require("../controllers/game_controller");

const { OK } = require("../helpers/status_code");

const router = express.Router();

router.post("/init", async (request, response) => {
  const id = request.body.userId;
  const game = await initNewGame(id);
  response.status(OK);
  response.json({ data: game });
});

router.get("/pseudo", async (request, response) => {
  const pseudo = await getStupidPseudo();
  response.status(OK);
  response.json({ data: pseudo });
});

module.exports = router;
