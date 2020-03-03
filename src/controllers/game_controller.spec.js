/* eslint-disable no-unused-expressions */
/* eslint-disable node/no-unpublished-require */
const chai = require("chai");
const match = require("chai-match");
const uuid = require("uuid/v4");
const sinon = require("sinon");

const { Game } = require("../models");
const generateAlphaNumStr = require("../utils/generateAlphaNumStr");
const { initNewGame } = require("./game_controller");

chai.use(match);
const { expect } = chai;

describe("Controllers :: game", () => {
  describe("#initNewGame", () => {
    it("should return a new game with a code and an user id", async () => {
      // Given
      const userId = uuid();
      const code = generateAlphaNumStr(5);
      const createDataObject = {
        userId,
        code,
      };
      const returnedObject = {
        id: uuid(),
        code,
        userId,
      };
      // When
      const createStub = sinon.stub(Game, "create").returns(returnedObject);
      const createdObect = await initNewGame(createDataObject);
      // Then
      expect(code).to.match(/^[a-zA-Z0-9]*$/);
      expect(code.length).to.equal(5);

      expect(createStub.calledOnce).to.be.true;
      expect(returnedObject).to.be.deep.equal(createdObect);
    });
  });
});
