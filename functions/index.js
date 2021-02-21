const functions = require("firebase-functions");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { format } = require("util");
const multerS3 = require("multer-s3");
const fileMiddleware = require("express-multipart-file-parser");

require("dotenv").config();
//initialize stripe module
const stripe = require("stripe")(
  "sk_test_51ILfdTIx8kJ3JcBGCZXdcQe0Zgqc43pqbu2vm1yrMUIMRXHYBSLCd7Vja6L4iwdPAktm8HE6oTTtVoT0f2d8xWZw008UEjBJce"
);

//initialize express app
const app = express();

//middlewares
app.use(fileMiddleware);
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

const admin = require("firebase-admin");
const serviceAccount = require("./marketingplatform-3b5c7-firebase-adminsdk-l8n9s-5457932180.json");

//initialize admin sdk
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

//initialize twilio client
const accountSid = functions.config().twilio.accountsid;
const authToken = functions.config().twilio.authtoken;
const client = require("twilio")(accountSid, authToken);
const MessagingResponse = require("twilio").twiml.MessagingResponse;

//Initialize AWS SDK for lightsail
const AWS_ACCESS_KEY = functions.config().aws.access;
const AWS_SECRET_KEY = functions.config().aws.secret;

const lightsail = new AWS.Lightsail({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: "us-east-1",
});

//Initialize AWS SDK for S3
const s3 = new AWS.S3({
  accessKeyId: functions.config().aws.access,
  secretAccessKey: functions.config().aws.secret,
  region: "us-east-1",
});

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "socialcalendarbtwg",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

//home route
app.get("/", (req, res) => {
  res.send("hello");
});

//AWS Routes
app.get("/aws/getinstances", (req, res) => {
  var params = {};
  lightsail.getInstances(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else res.send(data); // successful response
  });
});

//Not in use...
app.get("/aws/getdomains", (req, res) => {
  var params = {};
  lightsail.getDomains(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else res.send(data); // successful response
  });
});

app.get("/aws/getinstance/:instanceName", (req, res) => {
  var params = {
    instanceName: `${req.params.instanceName}`,
  };
  lightsail.getInstance(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else res.send(data); // successful response
  });
});

app.get(
  "/aws/:user/createinstance/:instanceName/:zone/:blueprint/:bundle",
  (req, res) => {
    var params = {
      instanceNames: [`${req.params.instanceName}`],
      availabilityZone: req.params.zone,
      blueprintId: req.params.blueprint,
      bundleId: req.params.bundle,
    };
    lightsail.createInstances(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else res.send(data); // successful response
    });
  }
);

app.get("/aws/getsnapshots", (req, res) => {
  var params = {};
  lightsail.getInstanceSnapshots(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else res.send(data); // successful response
  });
});

//twilio routes
app.post("/twilio", (req, res) => {
  const { phone, message, from } = req.body;

  client.messages
    .create({
      body: message,
      from: from,
      to: phone,
    })
    .then((message) => res.send(message.sid));
});

app.post("/twilio/sms", (req, res) => {
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

app.post("/checkout/:packageNum", async (req, res) => {
  const { packageNum } = req.params;
  let error;
  let status;

  try {
    const { product, token, email, name, password } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    if (packageNum === "1") {
      stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: "price_1ILsULIx8kJ3JcBGvMLg6RRE" }],
        add_invoice_items: [{ price: "price_1ILsULIx8kJ3JcBGs8T5sxCH" }],
      });
    } else if (packageNum === "2") {
      stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: "price_1IN8iFIx8kJ3JcBGR6KUfUOf" }],
        add_invoice_items: [{ price: "price_1ILsULIx8kJ3JcBGs8T5sxCH" }],
      });
    } else if (packageNum === "3") {
      stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: "price_1IN8lkIx8kJ3JcBGCxd8nRmm" }],
        add_invoice_items: [{ price: "price_1ILsULIx8kJ3JcBGs8T5sxCH" }],
      });
    }

    //console.log("Charge: ", { charge });
    status = "success";

    //TODO create aws instance based on information provided
    //TODO make sure aws information is added correctly into db
    //Account for future ability to add multiple instances
    if (status === "success") {
      admin
        .auth()
        .createUser({
          email: email,
          emailVerified: false,
          password: password,
          displayName: name,
          disabled: false,
        })
        .then((user) => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log("Successfully created new user:", user.uid);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            isAdmin: false,
            created: Date.now(),
            websites: [],
            twilioNum: "",
            subscriptionInfo: {
              type: product.name,
              monthlyAmount: product.price,
              stripeCustomerID: customer.id,
            },
          };
          db.collection("users").doc(user.uid).set(newUser);
          console.log("User added to database");
        })
        .catch((error) => {
          console.log("Error creating new user:", error);
        });
    }
  } catch (error) {
    console.error("Error: ", error);
    status = "failure";
  }

  res.json({ error, status });
});

//S3 Routes

// get posts
app.get("/:userid/:clientid/posts", (req, res) => {
  (async () => {
    try {
      let query = db.collection("socialposts");
      let response = [];
      await query.get().then((querySnapshot) => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
          if (doc.data().id === req.params.clientid) {
            const selectedItem = {
              id: doc.id,
              posts: doc.data().posts,
              clientid: doc.data().clientid,
            };
            response.push(selectedItem);
          }
        }
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// update
app.put("/:userid/add", (req, res) => {
  (async () => {
    console.log(req.body.post);
    let parsedData = JSON.parse(req.body.post);

    console.log(req.files[0]);
    s3.upload(
      {
        Body: req.files[0].buffer,
        ACL: "public-read",
        Key:
          Date.now() +
          "-" +
          req.params.userid +
          "-" +
          req.files[0].originalname,
        Bucket: "socialcalendarbtwg",
        Metadata: {},
      },
      async (err, data) => {
        //console.log(err, data);
        console.log(data.Location);
        try {
          const document = db.collection("socialposts").doc();
          await document.set({
            userid: req.params.userid,
            id: parsedData.id,
            imageUrl: data.Location,
            start: parsedData.start,
            end: parsedData.end,
            title: parsedData.title,
            hashtags: parsedData.hashtags,
            platform: parsedData.platform,
            description: parsedData.description,
          });
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error + "This is whats broken");
        }
      }
    );
  })();
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
    twilioNum: "",
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
