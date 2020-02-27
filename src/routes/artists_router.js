const express = require("express");
require("express-async-errors");

const {
  getAllArtists,
  getArtist,
  getSongsFromArtist,
} = require("../controllers/artists_controller");

const { OK } = require("../helpers/status_code");

const router = express.Router();

router.get("/", async (request, response) => {
  const data = await getAllArtists();
  response.status(OK);
  response.json({ data });
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const data = await getArtist(id);
  response.status(OK);
  response.json({ data });
});

router.get("/:id/songs", async (request, response) => {
  const { id } = request.params;
  const data = await getSongsFromArtist(id);
  response.status(OK);
  response.json({ data });
});

module.exports = router;
