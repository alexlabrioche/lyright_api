const express = require('express');

const artistsRouter = require('./artists_router');

const mainRouter = express.Router();

mainRouter.use('/artists', artistsRouter);

module.exports = mainRouter;
