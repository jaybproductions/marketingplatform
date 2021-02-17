const functions = require("firebase-functions");

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

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

exports.addUser = functions.auth.user().onCreate((user) => {
  const newUser = {
    id: user.uid,
    name: user.displayName,
    email: user.email,
    isAdmin: false,
    created: Date.now(),
    websites: [],
  };
  db.collection("users").doc(user.uid).set(newUser);
  console.log("User added to database");
});

exports.app = functions.https.onRequest(app);
