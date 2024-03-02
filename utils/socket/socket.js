const { Server } = require("socket.io");

const io = new Server({
  cors: {
    // origin: "http://127.0.0.1:5173",
    origin: "http://localhost:5173",

  },
});

require("./socketEvents")(io);

// io.on("connection", socketConnection);

module.exports = io;
