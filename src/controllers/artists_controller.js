const { Artist } = require('../models');

const artistsController = {
  getAllArtists: async () => {
    const artists = await Artist.findAll({
      order: [['created_at', 'ASC']],
      attributes: ['id', 'name', 'born', 'birthName'],
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
};

module.exports = artistsController;
