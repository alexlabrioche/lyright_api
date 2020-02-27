const generateAlphaNumStr = require("../utils/generateAlphaNumStr");
const generateStupidPseudo = require("../utils/generateStupidPseudo");

const { Artist } = require("../models");

function randomInt(max) {
  return Math.floor(Math.random() * (Math.floor(max) - 1)) + 1;
}

const controller = {
  getSecretCode: () => {
    return generateAlphaNumStr();
  },
  getStupidPseudo: async () => {
    const artists = await Artist.findAll({
      attributes: ["name"],
      raw: true,
    });
    const sorry4U = artists[randomInt(artists.length)];
    return generateStupidPseudo(sorry4U.name);
  },
};

module.exports = controller;
