/* eslint-disable camelcase */
const uuid = require("uuid/v4");
const moment = require("moment");

const now = moment()
  .utc()
  .toDate();

const user = [
  {
    id: uuid(),
    name: "JeSappelStupide",
    email: "jesappel@stupide.com",
    created_at: now,
    updated_at: now,
  },
];

module.exports = {
  user,
};
