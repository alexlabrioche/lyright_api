const express = require("express");
require("express-async-errors");

const { getSongDetails } = require("../controllers/songs_controller");

const { OK } = require("../helpers/status_code");

const router = express.Router();

router.get("/:id", async (request, response) => {
  const { id } = request.params;

  const data = await getSongDetails(id);
  response.status(OK);
  response.json({ data });
});

module.exports = router;
