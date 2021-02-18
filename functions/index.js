const functions = require("firebase-functions");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
//initialize stripe module
const stripe = require("stripe")(
  "sk_test_51ILfdTIx8kJ3JcBGCZXdcQe0Zgqc43pqbu2vm1yrMUIMRXHYBSLCd7Vja6L4iwdPAktm8HE6oTTtVoT0f2d8xWZw008UEjBJce"
);

//initialize express app
const app = express();

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());

const admin = require("firebase-admin");
const serviceAccount = require("./marketingplatform-3b5c7-firebase-adminsdk-l8n9s-4b21dea12c.json");

//initialize admin sdk
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

//initialize twilio client
const accountSid = "AC612f17d3dac16ff9ae8aeaae1bfebe94";
const authToken = "9bbfbc1fb1b4a88f483ef3da731571f9";
const client = require("twilio")(accountSid, authToken);
const MessagingResponse = require("twilio").twiml.MessagingResponse;

//home route
app.get("/", (req, res) => {
  res.send("hello");
});

//twilio routes
app.post("/twilio", (req, res) => {
  const { phone, message } = req.body;
  client.messages
    .create({
      body: message,
      from: "+18283830613",
      to: phone,
    })
    .then((message) => res.send(message.sid));
});

app.post("/twilio/sms", (req, res) => {
  const { message } = req.body;
  const twiml = new MessagingResponse();

  twiml.message(message);

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

//stripe routes
app.get("/teststripe", (req, res) => {
  let customerInfo = [];
  stripe.customers
    .create({
      email: "customer@example.com",
    })
    .then((customer) => res.send(customer))
    .catch((error) => console.error(error));
});

app.get("/getcustomer/:customerId", (req, res) => {
  stripe.customers
    .retrieve(req.params.customerId, {
      expand: ["subscriptions"],
    })
    .then((customer) => res.send(customer))
    .catch((error) => console.error(error));
});

app.get("/getsubscription/:productId", (req, res) => {
  stripe.products
    .retrieve(req.params.productId, {})
    .then((customer) => res.send(customer))
    .catch((error) => console.error(error));
});

app.get("/:customerId/getcard/:cardId", (req, res) => {
  stripe.customers
    .retrieveSource(req.params.customerId, req.params.cardId, {})
    .then((card) => res.send(card))
    .catch((error) => console.error(error));
});

//new user route
exports.addUser = functions.auth.user().onCreate((user) => {
  const newUser = {
    id: user.uid,
    name: user.displayName,
    email: user.email,
    isAdmin: false,
    created: Date.now(),
    websites: [],
    subscriptionInfo: {
      type: "",
      monthlyAmount: 0,
      due: "",
      stripeCustomerID: "",
      stripeSubscriptionID: "",
    },
  };
  db.collection("users").doc(user.uid).set(newUser);
  console.log("User added to database");
});

exports.app = functions.https.onRequest(app);
