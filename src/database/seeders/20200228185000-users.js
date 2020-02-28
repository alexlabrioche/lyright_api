const { user } = require("../seeds/20200228184500-users");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("users", user, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
