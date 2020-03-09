/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable node/no-unpublished-require */
const chai = require("chai");
const match = require("chai-match");
const uuid = require("uuid/v4");
const sinon = require("sinon");

const { Game, Song } = require("../models");
const generateAlphaNumStr = require("../utils/generateAlphaNumStr");
const { initNewGame, guessTheLyricTDD } = require("./game_controller");

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

  describe("#guessTheLyrics", () => {
    let mockFindAllSong;

    const artistId1 = uuid();
    const artistId2 = uuid();
    const songId1 = uuid();
    const songId2 = uuid();

    const createSong1 = {
      id: songId1,
      title: "song1",
      lyrics: ["A", "B", "C", "D", "E"],
    };
    const createSong2 = {
      id: songId2,
      title: "song2",
      lyrics: ["F", "G", "H", "I", "J"],
    };
    const createArtist1 = {
      id: artistId1,
      name: "artist1",
      songs: [createSong1],
    };
    const createArtist2 = {
      id: artistId2,
      name: "artist2",
      songs: [createSong2],
    };

    const createArtistList = [createArtist1, createArtist2];

    const createSongList = [createSong1, createSong2];

    const createReturnObject = {
      song: {
        id: songId1,
        title: "song1",
        lyrics: ["A", "B"],
        artist: {
          id: createArtist1.id,
          name: createArtist1.name,
        },
      },
      artists: [createArtist1, createArtist2],
    };

    before(() => {
      mockFindAllSong = sinon.stub(Song, "findAll").returns(createSongList);
    });

    after(() => {
      Song.findAll.restore();
    });

    it("should return a lyrics array from a song list", async () => {
      // Given
      const expectedReturnObject = {
        ...createReturnObject,
      };
      // When
      const returnedObject = await guessTheLyricTDD();
      // Then

      expect(mockFindAllSong.calledOnce).to.be.true;
      expect(returnedObject).to.be.deep.equal(expectedReturnObject);
    });

    it("should return a lyrics array and associated Artist", async () => {
      // Given
      const expectedReturnObject = {
        ...createReturnObject,
      };
      // When
      const returnedObject = await guessTheLyricTDD();
      // Then

      expect(mockFindAllSong.calledOnce).to.be.true;
      expect(returnedObject).to.be.deep.equal(expectedReturnObject);
    });
  });
});
