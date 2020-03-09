const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const SocketController = require("./controllers/socket_controller");

const {
  // notFoundHandler,
  // errorLogger,
  errorHandler,
} = require("./middlewares");

const routes = require("./routes");

const server = express();

server.use(errorHandler);

server.use(helmet());
server.use(logger("tiny"));
server.use(bodyParser.json());
server.use("/api", cors());

server.use("/api", routes);

// server.use(notFoundHandler);
// server.use(errorLogger);

const httpServer = http.createServer(server);
const io = socketIO(httpServer);

io.on("connection", SocketController(io));

module.exports = httpServer;
