/* eslint-disable no-unused-expressions */
/* eslint-disable node/no-unpublished-require */
const chai = require("chai");
const match = require("chai-match");
const { getSecretCode } = require("./game_controller");

chai.use(match);
const { expect } = chai;

describe("Controllers :: game", () => {
  describe("#getSecretCode", () => {
    it("should return an alpha numeric string of the given length", async () => {
      // Given

      // When
      const createdString = getSecretCode(5);
      // Then
      expect(createdString.length).to.equal(5);
      expect(createdString.length).to.equal(5);

      expect(createdString).to.match(/^[a-zA-Z0-9]*$/);
    });
  });
});
