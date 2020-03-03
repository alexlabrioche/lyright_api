const { pick } = require("lodash");

const generateAlphaNumStr = require("../utils/generateAlphaNumStr");
const generateStupidPseudo = require("../utils/generateStupidPseudo");
const getRandomInteger = require("../utils/getRandomInteger");
const { Artist, Game } = require("../models");

const controller = {
  initNewGame: async (userId) => {
    const code = generateAlphaNumStr();
    const data = { code, userId };
    const game = await Game.create(data);
    return pick(game, ["id", "code", "userId"]);
  },

  getStupidPseudo: async () => {
    const artistsList = await Artist.findAll({
      attributes: ["name"],
      raw: true,
    });
    const index = getRandomInteger(0, artistsList.length);
    const artist = artistsList ? artistsList[index] : { name: "Concon" };
    return generateStupidPseudo(artist.name);
  },
};

module.exports = controller;
