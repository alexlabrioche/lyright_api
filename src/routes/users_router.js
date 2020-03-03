const express = require("express");
require("express-async-errors");

const { addNewUser, loginUser } = require("../controllers/users_controller");

const { CREATED, OK } = require("../helpers/status_code");

const router = express.Router();

router.post("/login", async (request, response) => {
  const data = request.body;
  const user = await loginUser(data);
  response.status(OK);
  response.json({ data: user });
});

router.post("/signup", async (request, response) => {
  const data = request.body;
  const user = await addNewUser(data);
  response.status(CREATED);
  response.json({ data: user });
});

module.exports = router;
