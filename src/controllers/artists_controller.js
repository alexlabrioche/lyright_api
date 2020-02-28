const { Artist, Song } = require("../models");
const { NotFoundError } = require("../helpers/errors");

const controller = {
  getAllArtists: async () => {
    const artists = await Artist.findAll({
      order: [["created_at", "ASC"]],
      attributes: ["id", "name", "born", "birthName"],
      raw: true,
    });
    if (!artists) {
      throw new NotFoundError("Pas d'artistes trouvé");
    }
    return artists;
  },
  getArtist: async (id) => {
    const artist = await Artist.findByPk(id, {
      raw: true,
    });
    if (!artist) {
      throw new NotFoundError("Pas d'artiste trouvé");
    }
    return artist;
  },
  getSongsFromArtist: async (id) => {
    const songs = await Song.findAll({
      where: {
        artistId: id,
      },
      order: [["created_at", "ASC"]],
      attributes: ["id", "title"],
      raw: true,
    });
    if (!songs) {
      throw new NotFoundError("Pas d'artiste trouvé");
    }
    return songs;
  },
};

module.exports = controller;
