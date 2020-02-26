const { Artist, Song } = require("../models");

const controller = {
  getAllArtists: async () => {
    const artists = await Artist.findAll({
      order: [["created_at", "ASC"]],
      attributes: ["id", "name", "born", "birthName"],
      raw: true,
    });

    return artists;
  },
  getArtist: async (id) => {
    const artist = await Artist.findByPk(id, {
      raw: true,
    });
    return artist;
  },
  getSongsFromArtist: async (id) => {
    try {
      const songs = await Song.findAll({
        where: {
          artistId: id,
        },
        order: [["created_at", "ASC"]],
        attributes: ["id", "title"],
        raw: true,
      });
      return songs;
    } catch (error) {
      return error;
    }
  },
};

module.exports = controller;
