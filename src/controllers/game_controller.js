const { pick } = require("lodash");
const { Artist, Game, Song } = require("../models");

const { NotFoundError } = require("../helpers/errors");

const generateAlphaNumStr = require("../utils/generateAlphaNumStr");
const generateStupidPseudo = require("../utils/generateStupidPseudo");
const getRandomInt = require("../utils/getRandomInteger");

function checkIfLongEnough(arr, min) {
  const max = arr.length;
  let attempt = 0;
  let str;
  let index;

  do {
    index = getRandomInt(0, max);
    str = arr[index].trim();
    attempt += 1;
  } while (str.length < min && attempt < max);

  return attempt === max ? { str: null } : { str, index };
}

async function getArtistAndSongs(id) {
  const artistAndSongs = await Artist.findByPk(id, {
    attributes: ["id", "name"],
    include: [
      {
        model: Song,
        attributes: ["id", "title", "lyrics"],
      },
    ],
  });
  return artistAndSongs;
}
async function getArtist(id) {
  const artist = await Artist.findByPk(id, {
    attributes: ["id", "name"],
  });
  return artist;
}

function reduceTotalLyrics(arr) {
  return arr.reduce((acc, current) => {
    return acc + current.lyrics.split("\n").length;
  }, 0);
}

const controller = {
  initNewGame: async (userId) => {
    const code = generateAlphaNumStr();
    const data = { code, userId };
    const game = await Game.create(data);
    return pick(game, ["id", "code", "userId"]);
  },
  initNewGameV2: () => {
    const code = generateAlphaNumStr();
    return code;
  },

  getStupidPseudo: async () => {
    const artistsList = await Artist.findAll({
      attributes: ["name"],
      raw: true,
    });
    const index = getRandomInt(0, artistsList.length);
    const artist = artistsList ? artistsList[index] : { name: "Concon" };
    return generateStupidPseudo(artist.name);
  },

  guessTheLyric: async (query) => {
    const { id1, id2, length = 50 } = query;
    const allArtists = await Artist.findAll();
    const max = allArtists.length;
    const firstId = id1 || allArtists[getRandomInt(0, max)].id;
    const secondId = id2 || allArtists[getRandomInt(0, max)].id;
    const ids = [firstId, secondId];
    const winnerId = ids[getRandomInt(0, 2)];

    const artistAndSongs = await getArtistAndSongs(winnerId);
    const SongsList = artistAndSongs.Songs;
    const artistLyricsCount = reduceTotalLyrics(SongsList);
    const artist = await getArtist(secondId);

    let attempt = 0;
    let lyricObj;
    let song;
    let lyricsArr;

    do {
      const songIndex = getRandomInt(0, SongsList.length);
      song = SongsList[songIndex];
      lyricsArr = song.lyrics.split("\n");
      lyricObj = checkIfLongEnough(lyricsArr, length);
      attempt += 1;
    } while (typeof lyricObj.str !== "string" && attempt < artistLyricsCount);

    if (lyricObj.str) {
      const lyricIndex = lyricObj.index;
      const returnLyrics =
        lyricIndex === lyricsArr.length
          ? lyricsArr.slice(lyricIndex - 1, lyricIndex + 1)
          : lyricsArr.slice(lyricIndex, lyricIndex + 2);

      return {
        song: {
          lyrics: returnLyrics,
          title: song.title,
          id: song.id,
          artist: artistAndSongs.name,
          artistId: artistAndSongs.id,
        },
        artists: [
          {
            name: artistAndSongs.name,
            id: artistAndSongs.id,
          },
          {
            name: artist.name,
            id: artist.id,
          },
        ],
      };
    }
    throw new NotFoundError(
      "L'artiste n'a pas de lyric ou la longueur minimale est trop importante",
    );
  },
  guessTheLyricTDD: async () => {
    const songList = await Song.findAll();

    const song = songList[0];
    return {
      id: song.id,
      title: song.title,
      lyrics: [song.lyrics[0], song.lyrics[1]],
    };
  },
};

module.exports = controller;
