function getRandomInteger(min, max) {
  return (
    Math.floor(Math.random() * (Math.floor(max - 1) - Math.ceil(min) + 1)) +
    Math.ceil(min)
  );
}

module.exports = getRandomInteger;
