const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const SocketController = require("./controllers/socket_controller");

const { notFoundHandler, errorHandler } = require("./middlewares");

const routes = require("./routes");

const server = express();

server.use(errorHandler);
server.use(notFoundHandler);

server.use(helmet());
server.use(logger("tiny"));
server.use(bodyParser.json());
server.use("/api", cors());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

server.use("/api", routes);

const httpServer = http.createServer(server);
const io = socketIO(httpServer);

io.on("connection", SocketController(io));

module.exports = httpServer;
