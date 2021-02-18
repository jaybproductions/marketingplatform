const functions = require("firebase-functions");

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51ILfdTIx8kJ3JcBGCZXdcQe0Zgqc43pqbu2vm1yrMUIMRXHYBSLCd7Vja6L4iwdPAktm8HE6oTTtVoT0f2d8xWZw008UEjBJce"
);

const rootURL = "https://chart.googleapis.com/chart?";

const app = express();

var admin = require("firebase-admin");

var serviceAccount = require("./marketingplatform-3b5c7-firebase-adminsdk-l8n9s-5457932180.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());

const db = admin.firestore();

app.get("/", (req, res) => {
  res.send("hello");
});

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
