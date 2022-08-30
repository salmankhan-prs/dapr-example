const express = require("express");

const WebSocket = require("ws");
const { createServer } = require("http");
const { DaprServer, HttpMethod } = require("@dapr/dapr");

const daprHost = "127.0.0.1"; // Dapr Sidecar Host
const daprPort = "3501"; // Dapr Sidecar Port of this Example Server
const serverHost = "127.0.0.1"; // App Host of this Example Server
const serverPort = "9000"; // App Port of this Example Server "

const app = express();
app.use(express.json());
app.use("/", require("./routes"));

app.get("/", (req, res) => {
  res.send("HEELO");
});
const PORT = process.env.PORT || 9000;

//initialize a http server
app.listen(PORT, () => console.log("SERVER STARTED AT " + PORT));
