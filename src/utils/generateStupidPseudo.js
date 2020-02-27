const shortNames = [
  "Lil",
  "Yung",
  "Young",
  "Big",
  "Kid",
  "Snoop",
  "Crank$",
  "Bauhaus",
  "Cool J",
  "King",
  "Queen",
  "Sassy",
  "Ya Boy",
  "Ya Dead",
  "Big Bear",
  "Duckling",
  "El Druid",
  "Tum Tum",
  "G-Mail",
  "Ghostface",
  "Bada$$",
  "Dr",
  "Tumblr",
];
const longNames = [
  "Two Chains",
  "Tea Bag Boyz",
  "tha Phat Bastard",
  "Art Brute",
  "Marmalaid",
  "Yung Adult",
  "Dat Skydiver",
  "Botany Boyz",
  "A Tribe Called",
  "AssassinZ",
  "Lil’iputian",
  "Trillion$",
  "Crying Game",
  "Fresh Drummer",
  "Lion Man",
  "DJ Yung Educated",
  "Sofresh n’Soclean",
  "T-Suffering",
  "Afrodisijack",
  "Ghetto Superstar",
  "The Cremator",
  "Dat Homeless",
  "Mo’lasses",
  "Overlordz",
  "Falafel",
];

function randomInt(max) {
  return Math.floor(Math.random() * (Math.floor(max) - 1)) + 1;
}

function generateStupidPseudo(name) {
  const [first, last] = name.split(" ");
  if (last) {
    return `${first} ${shortNames[randomInt(shortNames.length)]} ${last}`;
  }
  return `${longNames[randomInt(longNames.length)]} ${first}`;
}

module.exports = generateStupidPseudo;
