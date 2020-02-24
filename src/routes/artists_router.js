const express = require('express');
require('express-async-errors');

const { OK } = require('../helpers/status_code');

const artistsRouter = express.Router();

artistsRouter.get('/test', async (request, response) => {
  response.status(OK);
  response.json({ message: 'ok bb' });
});

module.exports = artistsRouter;
