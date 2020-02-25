/* eslint-disable camelcase */
const uuid = require('uuid/v4');
const moment = require('moment');
const { flatten } = require('lodash');
const readJsonFiles = require('../../utils/readJsonFiles');

const now = moment()
  .utc()
  .toDate();

const data = readJsonFiles('data');

const artistsFormatted = data.map((artist) => ({
  id: uuid(),
  created_at: now,
  updated_at: now,
  ...artist,
}));

// function reduceDataArray(arr, key) {
//   return arr.reduce((acc, current) => {
//     if (current[key]) {
//       current[key].map((s) => {
//         if (!acc.includes(s.toLocaleLowerCase())) {
//           acc.push(s.toLocaleLowerCase());
//         }
//         return acc;
//       });
//     }
//     return acc;
//   }, []);
// }
// const genresArray = reduceDataArray(data, 'genres');
// const labelsArray = reduceDataArray(data, 'labels');
// console.log('reduced', genresArray, labelsArray);

module.exports = {
  up: async (queryInterface) => {
    const artistsToInsert = artistsFormatted.map(
      ({ id, artist, created_at, updated_at, born, birth_name }) => ({
        id,
        name: artist,
        born,
        birth_name,
        created_at,
        updated_at,
      }),
    );

    await queryInterface.bulkInsert('artists', artistsToInsert, {});

    const songsToInsert = flatten(
      artistsFormatted.map((artist) => {
        return artist.discography.map(({ song, lyrics }) => ({
          id: uuid(),
          title: song,
          artist_id: artist.id,
          lyrics,
          created_at: now,
          updated_at: now,
        }));
      }),
    ).filter(
      ({ lyrics }) => lyrics.length > 0 && lyrics.every((s) => s.length < 255),
    );

    await queryInterface.bulkInsert('songs', songsToInsert, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('artists', null, {});
    await queryInterface.bulkDelete('songs', null, {});
  },
};
