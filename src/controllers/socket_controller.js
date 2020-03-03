const uuid = require("uuid/v4");
const {
  VERIFY_USER,
  USER_CONNECTED,
  USER_DISCONNECTED,
  LOGOUT,
  USER_ACTION,
} = require("../constants/socket_events");

const createUser = ({ name = "" } = {}) => ({
  id: uuid(),
  name,
});

let connectedUsers = {};

function addUser(userList, user) {
  const newList = { ...userList };
  newList[user.name] = user;
  return newList;
}

function addAction(userList, { action, user }) {
  const newList = { ...userList };
  newList[user.name] = { ...user, action };
  return newList;
}

function removeUser(userList, username) {
  const newList = { ...userList };
  delete newList[username];
  return newList;
}

function isUser(userList, username) {
  return username in userList;
}

module.exports = (io) => (socket) => {
  console.log("💻 Client connected id:", socket.id);
  socket.on(VERIFY_USER, (name, callback) => {
    console.log("🐲 VERIFY_USER", name);
    if (isUser(connectedUsers, name)) {
      callback({ isUser: true, user: null });
    } else {
      callback({ isUser: false, user: createUser({ name }) });
    }
  });

  socket.on(USER_CONNECTED, (user) => {
    // eslint-disable-next-line no-param-reassign
    user.socketId = socket.id;

    connectedUsers = addUser(connectedUsers, user);
    // eslint-disable-next-line
    socket.user = user;
    io.sockets.emit(USER_CONNECTED, connectedUsers);
    console.log("🐲 USER_CONNECTED", connectedUsers);
  });

  socket.on(USER_ACTION, (user) => {
    connectedUsers = addAction(connectedUsers, user);
    io.sockets.emit(USER_ACTION, connectedUsers);
    console.log("🐲 USER_ACTION", connectedUsers);
  });

  socket.on("disconnect", () => {
    if ("user" in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user.name);

      io.sockets.emit(USER_DISCONNECTED, connectedUsers);
      console.log("🐲 disconnect", connectedUsers);
    }
  });

  socket.on(LOGOUT, () => {
    connectedUsers = removeUser(connectedUsers, socket.user.name);
    io.sockets.emit(USER_DISCONNECTED, connectedUsers);
    console.log("🐲 LOGOUT", connectedUsers);
  });
};
