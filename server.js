const http = require("http");
const express = require("express");
const router = require("./router");
const fs = require("fs");
var path = require("path");
// const mini_port = require("./client/src/components/Toolbar/Port");
// require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 8080
// function PORT() {
//   const port = process.env.PORT || Math.floor(Math.random() * 1000) + 1;
//   console.log("jojo", port);
//   return port;
// }

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client","build","index.html"));
  });
} else {
  app.get("/", router);
}

// console.log(`Server has started.`);
// console.log(router);
io.on("connection", (socket) => {
  socket.on("savePath", (path) => {
    console.log("A New Path Has been Recived", path);
    fs.writeFile("path.txt", JSON.stringify(path), function (err) {
      if (err) throw err;
      console.log("complete");
    });
  });
});

// const mini_port = PORT();
// process.env.REACT_APP_PORT = mini_port.usePort();
// mini_port.usePort();
// console.log(process.env.REACT_APP_PORT, "11111");
server.listen(PORT, () =>
  console.log(`Server has started. ${PORT}`)
);

// module.exports = mini_port;
