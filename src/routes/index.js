const express = require("express");

const artistsRouter = require("./artists_router");
const songsRouter = require("./songs_router");
const gameRouter = require("./game_router");
const usersRouter = require("./users_router");

const router = express.Router();

router.use("/artists", artistsRouter);
router.use("/songs", songsRouter);
router.use("/game", gameRouter);
router.use("/users", usersRouter);

module.exports = router;
