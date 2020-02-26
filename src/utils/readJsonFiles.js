const fs = require("fs");
const path = require("path");

global.appRoot = path.resolve(`${__dirname}/../`);

const readJsonFiles = (pathName) => {
  const { appRoot } = global;
  const allFiles = fs.readdirSync(`${appRoot}/${pathName}`, (err) => {
    if (err) {
      throw new Error("error:", err);
    }
  });
  return allFiles.map((fileName) => {
    const data = JSON.parse(
      fs.readFileSync(`${appRoot}/${pathName}/${fileName}`),
    );
    return data;
  });
};
module.exports = readJsonFiles;
