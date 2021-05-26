const admin = require("firebase-admin");
const functions = require("firebase-functions");
const serviceAccount = require("./marketingplatform-3b5c7-firebase-adminsdk-l8n9s-eccaf51973.json");

module.exports = admin.initializeApp(serviceAccount);
