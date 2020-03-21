const express = require("express");
require("express-async-errors");

const {
  getStupidPseudo,
  initNewGame,
  guessTheLyric,
  joinGame,
} = require("../controllers/game_controller");
const { validateToken } = require("../middlewares/validate_token");

const { OK } = require("../helpers/status_code");

const router = express.Router();

router.get("/lyrics", async (request, response) => {
  const { query } = request;
  const data = await guessTheLyric(query);
  response.status(OK);
  response.json({ data });
});

router.get("/new", validateToken, async (request, response) => {
  const id = request.body.user.uid;
  const pseudo = request.body.user.name;
  const game = await initNewGame(id);
  response.status(OK);
  response.json({ data: { ...game, pseudo } });
});

router.post("/join", async (request, response) => {
  const { code, pseudo, enhanceName } = request.body;
  const game = await joinGame(code);
  let pseudoEnhanced = pseudo;
  if (enhanceName) {
    pseudoEnhanced = await getStupidPseudo(pseudo);
  }
  if (pseudo.length === 0) {
    pseudoEnhanced = await getStupidPseudo();
  }
  response.status(OK);
  response.json({ data: { ...game, pseudo: pseudoEnhanced } });
});

router.get("/pseudo", async (request, response) => {
  const pseudo = await getStupidPseudo();
  response.status(OK);
  response.json({ data: pseudo });
});

module.exports = router;
