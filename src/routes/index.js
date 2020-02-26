const express = require("express");

const artistsRouter = require("./artists_router");
const songsRouter = require("./songs_router");

const mainRouter = express.Router();

mainRouter.use("/artists", artistsRouter);
mainRouter.use("/songs", songsRouter);

module.exports = mainRouter;
