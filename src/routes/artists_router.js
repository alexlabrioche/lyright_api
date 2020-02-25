const express = require('express');
require('express-async-errors');

const {
  getAllArtists,
  getArtist,
} = require('../controllers/artists_controller');

const { OK } = require('../helpers/status_code');

const artistsRouter = express.Router();

artistsRouter.get('/test', async (request, response) => {
  response.status(OK);
  response.json({ message: 'ok bb' });
});

artistsRouter.get('/', async (request, response) => {
  const artists = await getAllArtists();
  response.status(OK);
  response.json({ error: null, data: artists });
});

artistsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const artists = await getArtist(id);
  response.status(OK);
  response.json({ error: null, data: artists });
});

module.exports = artistsRouter;
