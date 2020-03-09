const express = require("express");
require("express-async-errors");

const {
  getStupidPseudo,
  initNewGame,
  guessTheLyric,
  initNewGameV2,
} = require("../controllers/game_controller");
const { validateToken } = require("../middlewares/validate_token");

const { OK } = require("../helpers/status_code");

const router = express.Router();

router.get("/lyric", async (request, response) => {
  const { query } = request;
  const data = await guessTheLyric(query);
  response.status(OK);
  response.json({ data });
});

router.get("/", validateToken, (request, response) => {
  const code = initNewGameV2();
  response.status(OK);
  response.json({ data: { code } });
});

router.post("/init", validateToken, async (request, response) => {
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
