const { Song } = require("../models");
const { NotFoundError } = require("../helpers/errors");

const controller = {
  getSongDetails: async (id) => {
    try {
      const song = await Song.findByPk(id, {
        attributes: [
          "id",
          "title",
          "lyrics",
          "artist_id",
          "created_at",
          "updated_at",
        ],
        raw: true,
      });
      return song;
    } catch (error) {
      throw new NotFoundError("Chason pas trouvé", error);
    }
  },
};

module.exports = controller;
