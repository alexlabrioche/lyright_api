const {
  artistsToInsert,
  songsToInsert,
} = require("../seeds/20200225123300-data");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("artists", artistsToInsert, {});
    await queryInterface.bulkInsert("songs", songsToInsert, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("artists", null, {});
    await queryInterface.bulkDelete("songs", null, {});
  },
};
