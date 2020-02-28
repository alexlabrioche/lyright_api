const express = require("express");
require("express-async-errors");

const { addNewUser } = require("../controllers/users_controller");

const { CREATED } = require("../helpers/status_code");

const router = express.Router();

router.post("/", async (request, response) => {
  const data = request.body;
  const user = await addNewUser(data);
  response.status(CREATED);
  response.json({ data: user });
});

module.exports = router;
