const router = require("express").Router();
const functions = require("firebase-functions");
const firebase = require("../firebase");
const db = firebase.firestore();

//initialize stripe module
const stripe = require("stripe")(
  "sk_test_51ILfdTIx8kJ3JcBGCZXdcQe0Zgqc43pqbu2vm1yrMUIMRXHYBSLCd7Vja6L4iwdPAktm8HE6oTTtVoT0f2d8xWZw008UEjBJce"
);

router.get("/", (req, res) => {
  res.json({ status: "This is the default stripe route" });
});

router.get("/teststripe", (req, res) => {
  let customerInfo = [];
  stripe.customers
    .create({
      email: "customer@example.com",
    })
    .then((customer) => res.send(customer))
    .catch((error) => console.error(error));
});

//get customer by cusID
router.get("/getcustomer/:customerId", (req, res) => {
  stripe.customers
    .retrieve(req.params.customerId, {
      expand: ["subscriptions"],
    })
    .then((customer) => res.send(customer))
    .catch((error) => console.error(error));
});

//get subscription from prodId
router.get("/getsubscription/:productId", (req, res) => {
  stripe.products
    .retrieve(req.params.productId, {})
    .then((customer) => res.send(customer))
    .catch((error) => console.error(error));
});

//get cardId from a cusId
router.get("/:customerId/getcard/:cardId", (req, res) => {
  stripe.customers
    .retrieveSource(req.params.customerId, req.params.cardId, {})
    .then((card) => res.send(card))
    .catch((error) => console.error(error));
});

//Stripe checkout
router.post("/checkout", async (req, res) => {
  let error;
  let status;
  let userId;
  let sourceInfo;
  let customerId;

  try {
    const {
      product,
      token,
      email,
      name,
      password,
      blueprintId,
      bundleId,
      availabilityZone,
      instanceName,
      packageNum,
    } = req.body;

    const source = await stripe.sources.create(
      {
        type: "card",
        currency: "usd",
        token: token.id,
        owner: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      (err, source) => {
        if (err) {
          console.log(err);
        } else {
          console.log(source.id);
          stripe.customers.create(
            {
              email: token.email,
              source: source.id,
            },
            (err, customer) => {
              customerId = customer.id;
              if (packageNum === "1") {
                stripe.subscriptions.create({
                  customer: customer.id,
                  items: [{ price: "price_1ILsULIx8kJ3JcBGvMLg6RRE" }],
                  add_invoice_items: [
                    { price: "price_1ILsULIx8kJ3JcBGs8T5sxCH" },
                  ],
                });
              } else if (packageNum === "2") {
                stripe.subscriptions.create({
                  customer: customer.id,
                  items: [{ price: "price_1IN8iFIx8kJ3JcBGR6KUfUOf" }],
                  add_invoice_items: [
                    { price: "price_1ILsULIx8kJ3JcBGs8T5sxCH" },
                  ],
                });
              } else if (packageNum === "3") {
                stripe.subscriptions.create({
                  customer: customer.id,
                  items: [{ price: "price_1IN8lkIx8kJ3JcBGCxd8nRmm" }],
                  add_invoice_items: [
                    { price: "price_1ILsULIx8kJ3JcBGs8T5sxCH" },
                  ],
                });
              }
            }
          );
        }
      }
    );
    status = "success";

    if (status === "success") {
      firebase
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
          userId = user.uid;
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
              stripeCustomerID: customerId,
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

  res.json({ error, status, userId });
});

module.exports = router;
