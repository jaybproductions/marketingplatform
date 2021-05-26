const firebase = require("./firebase");
const functions = require("firebase-functions");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileMiddleware = require("express-multipart-file-parser");

require("dotenv").config();

//initialize express app
const app = express();
const awsRoutes = require("./routes/aws");
const stripeRoutes = require("./routes/stripe");
const twilioRoutes = require("./routes/twilio");
const socialRoutes = require("./routes/social");

//middlewares
app.use(fileMiddleware);
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/aws", awsRoutes);
app.use("/stripe", stripeRoutes);
app.use("/twilio", twilioRoutes);
app.use("/social", socialRoutes);

//home route
app.get("/", (req, res) => {
  res.json({ status: "This is the default firebase functions route..." });
});

//export app to firebase functions
exports.app = functions.https.onRequest(app);
