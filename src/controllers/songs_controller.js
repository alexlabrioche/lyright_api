const { Song } = require("../models");

const controller = {
  getSongDetails: async (id) => {
    // Problème avec relation ArtistId
    const song = await Song.findByPk(id, {
      attributes: ["id", "title", "created_at", "updated_at"],
      raw: true,
    });
    return song;
  },
};

module.exports = controller;
