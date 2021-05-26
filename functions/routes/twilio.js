const router = require("express").Router();
const functions = require("firebase-functions");
const firebase = require("../firebase");
const db = firebase.firestore();
//initialize twilio client
const accountSid = functions.config().twilio.accountsid;
const authToken = functions.config().twilio.authtoken;
const client = require("twilio")(accountSid, authToken);
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const twilio = require("twilio");

//twilio routes
router.post("/", (req, res) => {
  const { phone, message, from } = req.body;

  client.messages
    .create({
      body: message,
      from: from,
      to: phone,
    })
    .then((message) => res.send(message.sid));
});

router.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();
  const { Body, From, To } = req.body;

  db.collection("messages")
    .doc()
    .set({
      message: Body,
      timestamp: Date.now(),
      from: From,
      to: To,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

module.exports = router;
