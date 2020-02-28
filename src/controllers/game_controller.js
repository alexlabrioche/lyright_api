const generateAlphaNumStr = require("../utils/generateAlphaNumStr");
const generateStupidPseudo = require("../utils/generateStupidPseudo");
const getRandomInteger = require("../utils/getRandomInteger");

const { Artist } = require("../models");

const controller = {
  getSecretCode: () => {
    return generateAlphaNumStr();
  },
  getStupidPseudo: async () => {
    const artists = await Artist.findAll({
      attributes: ["name"],
      raw: true,
    });
    const sorry4U = artists
      ? artists[getRandomInteger(0, artists.length)]
      : { name: "Concon" };
    return generateStupidPseudo(sorry4U.name);
  },
};

module.exports = controller;
