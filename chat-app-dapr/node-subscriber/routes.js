const router = require("express").Router();
const WebSocket = require("ws");
const broadcast = (clients, text) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "message",
          text,
        })
      );
    }
  });
};

router.post("/message", (req, res) => {
  return res.send(req.body);
});
module.exports = router;
