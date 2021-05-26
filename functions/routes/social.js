const router = require("express").Router();
const functions = require("firebase-functions");
const firebase = require("../firebase");
const db = firebase.firestore();
const AWS = require("aws-sdk");
const AWS_ACCESS_KEY = functions.config().aws.access;
const AWS_SECRET_KEY = functions.config().aws.secret;

//Initialize AWS SDK for S3
const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: "us-east-1",
});

router.get("/", (req, res) => {
  res.json({ status: "This is the default social route" });
});

//Social Calendar Routes
// get posts
router.get("/:userid/:clientid/posts", (req, res) => {
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

// add new post to calendar -- upload to s3 -- add to firestore db
router.put("/:userid/add", (req, res) => {
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

module.exports = router;
