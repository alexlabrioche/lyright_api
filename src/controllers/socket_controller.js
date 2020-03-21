/* eslint-disable consistent-return */
let users = [];

const addUser = ({ id, name, room, isHost }) => {
  const existingUser = users.find(
    (user) => user.room === room && user.name === name,
  );
  if (!name || !room) return { error: "Nom et Room requis." };
  if (existingUser) return { error: "Nom deja prit." };

  const user = { id, name, room, host: isHost, score: 0, sendAnswer: false };

  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getPlayersInRoom = (room) =>
  users.filter((user) => user.room === room && !user.host);

const updatePlayerScore = ({ score, id }) => {
  users.map((user) => {
    if (user.id === id) {
      // eslint-disable-next-line no-param-reassign
      user.score += score;
    }
    return user;
  });
  return users;
};

const resetPlayersAnswers = (room) => {
  const usersUpdated = users.map((user) => {
    if (user.room === room) {
      return { ...user, sendAnswer: false };
    }
    return user;
  });
  users = usersUpdated;
};

module.exports = (io) => (socket) => {
  console.log("💻 Client connect");

  socket.on("join", ({ name, room, isHost = false }, callback) => {
    console.log("🍤 join");
    const { error, user } = addUser({ id: socket.id, name, room, isHost });

    if (error) return callback(error);

    socket.join(user.room);

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} à rejoint la partie !`,
    });

    io.to(user.room).emit("players", getPlayersInRoom(user.room));

    callback();
  });

  socket.on("newRound", (gameData, callback) => {
    const user = getUser(socket.id);
    const start = Date.now();
    const end = start + 10000;

    resetPlayersAnswers(user.room);

    console.log("🍤 newRound", getPlayersInRoom(user.room));

    io.to(user.room).emit("gameData", { ...gameData, start, end });
    io.to(user.room).emit("players", getPlayersInRoom(user.room));

    callback();
  });

  socket.on("updateScore", (score, callback) => {
    const user = getUser(socket.id);

    user.sendAnswer = true;

    updatePlayerScore({ score, id: user.id });

    io.to(user.room).emit("players", getPlayersInRoom(user.room));

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log("🍤 sendMessage");

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log("🍤 disconnect");

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} est parti.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
};
