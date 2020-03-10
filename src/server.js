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

const whitelist = ["http://localhost:3000", "https://lyright.herokuapp.com/"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

server.use("/api", cors(corsOptions));

server.use(errorHandler);
server.use(notFoundHandler);

server.use(helmet());
server.use(logger("tiny"));
server.use(bodyParser.json());

server.use("/api", routes);

const httpServer = http.createServer(server);
const io = socketIO(httpServer);

io.on("connection", SocketController(io));

module.exports = httpServer;
