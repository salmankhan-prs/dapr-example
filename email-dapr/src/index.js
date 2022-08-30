const { DaprServer, HttpMethod } = require("@dapr/dapr");

const daprHost = "127.0.0.1";
const daprPort = "3500";
const serverHost = "127.0.0.1";
const serverPort = "3001";
const server = new DaprServer(serverHost, serverPort, daprHost, daprPort);

// Implements the onSend method for when the Dapr invocation happened
async function onSend(req, res) {
  const subject = req.body?.subject;
  const emailTo = req.body?.emailTo;

  if (!subject || !emailTo) {
    throw new Error(
      JSON.stringify({
        error: "Missing subject or emailTo fields",
      })
    );
  }

  await server.binding.receive(
    "binding-smtp",
    "<html><body>Hello World</body></html>",
    {
      emailTo,
      subject,
    }
  );

  console.log("Done Sending Email");

  return res.json({
    isDone: true,
  });
}

// Initialize the SDK to listen on the POST /send endpoint
// Note: in the SDK this spins up a server that listens on a port. This port is defined through the DAPR_APP_PORT environment variable, so we need to open it when starting Dapr!
async function main() {
  server.invoker.listen("send", onSend, {
    method: HttpMethod.POST,
  });
}

main().catch((e) => {
  console.error(e);
});
