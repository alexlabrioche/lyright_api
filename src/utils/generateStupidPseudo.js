const getRandomInteger = require("./getRandomInteger");
const { short, long } = require("../assets/stupid_names");

function generateStupidPseudo(name) {
  const [first, last] = name.split(" ");
  if (last) {
    return `${first} ${short[getRandomInteger(0, short.length)]} ${last}`;
  }
  return `${long[getRandomInteger(0, long.length)]} ${first}`;
}

module.exports = generateStupidPseudo;
