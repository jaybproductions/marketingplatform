const router = require("express").Router();
const functions = require("firebase-functions");
const AWS = require("aws-sdk");

//Initialize AWS SDK for lightsail
const AWS_ACCESS_KEY = functions.config().aws.access;
const AWS_SECRET_KEY = functions.config().aws.secret;

const lightsail = new AWS.Lightsail({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: "us-east-1",
});

router.get("/", (req, res) => {
  res.json({ status: "This is the default aws route" });
});

router.get("/getinstances", (req, res) => {
  var params = {};
  lightsail.getInstances(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else res.send(data); // successful response
  });
});

//Not in use...
router.get("/getdomains", (req, res) => {
  var params = {};
  lightsail.getDomains(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else res.send(data); // successful response
  });
});

//get lightsail instance by instance name
router.get("/getinstance/:instanceName", (req, res) => {
  var params = {
    instanceName: `${req.params.instanceName}`,
  };
  lightsail.getInstance(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else res.send(data); // successful response
  });
});

//create a new instance when customer purchases one
router.get(
  "/:user/createinstance/:instanceName/:zone/:blueprint/:bundle",
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

router.get("/aws/bundles", (req, res) => {
  lightsail.getBundles((err, data) => {
    res.send(data);
  });
});

router.get("/getsnapshots", (req, res) => {
  var params = {};
  lightsail.getInstanceSnapshots(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else res.send(data); // successful response
  });
});

//attach a static ip to newly created instance --> !TODO figure out a way to create a new static IP
router.post("/attachip", (req, res) => {
  const { instanceName, staticIpName } = req.body;

  var ipParams = {
    instanceName: instanceName,
    staticIpName: staticIpName,
  };
  lightsail.attachStaticIp(ipParams, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else res.send(data); // successful response
  });
});

router.post("/allocateip", (req, res) => {
  //!This creates a new static ip -- using frontend to assign that created ip on first load
  lightsail.allocateStaticIp(
    {
      staticIpName: `StaticIp-${user.uid}`,
    },
    (err, data) => {
      console.log(data);
    }
  );
});

module.exports = router;
