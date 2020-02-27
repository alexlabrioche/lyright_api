function generateAlphaNumStr(length = 5) {
  return (
    [...Array(length)]
      // eslint-disable-next-line no-bitwise
      .map(() => ((Math.random() * 36) | 0).toString(36))
      .join("")
  );
}

module.exports = generateAlphaNumStr;
