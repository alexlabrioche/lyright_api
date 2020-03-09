// /* eslint-disable no-unused-expressions */
// /* eslint-disable node/no-unpublished-require */
// const { expect } = require("chai");
// const sinon = require("sinon");
// const uuid = require("uuid/v4");
// const { getLyricStr } = require("./songs_controller");
// const { Song } = require("../models");

// describe("Controllers :: songs", () => {
//   // Given
//   const artistId = uuid();

//   const createReturnObject = {
//     id: artistId,
//     name: "test name",
//   };

//   const createReturnArray = Array.from(new Array({ artistId }));

//   const stubFindAllSongs = sinon
//     .stub(Song, "findAll")
//     .returns(createReturnArray);

//   const createStubSong = sinon.stub(Song, "findAll").returns(createReturnArray);

//   const createStubFindByPk = sinon
//     .stub(Artist, "findByPk")
//     .returns(createReturnObject);

//   describe("#getLyricStr", () => {
//     it("should return the all the artists in db", async () => {
//       // When
//       const createdArray = await getAllArtists();

//       // Then
//       expect(createStubArtist.calledOnce).to.be.true;
//       expect(createdArray).to.equal(createReturnArray);
//     });
//   });
//   describe("#getArtist", () => {
//     it("should return one artist from his primary key", async () => {
//       // When
//       const createdObject = await getArtist(artistId);

//       // Then
//       expect(createStubFindByPk.calledOnce).to.be.true;
//       expect(createdObject).to.equal(createReturnObject);
//     });
//   });
//   describe("#getSongsFromArtist", () => {
//     it("should return a songs list from an artist id", async () => {
//       // When
//       const createdArray = await getSongsFromArtist(artistId);

//       // Then
//       expect(createStubSong.calledOnce).to.be.true;
//       expect(createdArray).to.equal(createReturnArray);
//     });
//   });
// });
