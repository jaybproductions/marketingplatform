import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Package from "./Package";
import { Card, CardContent } from "@material-ui/core";
import firebase from "../../../../firebase";
import { useHistory } from "react-router-dom";
//!TODO have user signup using auth and make sure user is added to db before processing payment
//!TODO to ensure correct customer ID is added to db

//Finalize checkout and process payment through stripe -- create firebase account --
const Step4 = ({ selectedPackage, email, name, password }) => {
  let history = useHistory();
  const [token, setToken] = useState(null);
  const [product] = useState({
    name: selectedPackage.number,
    price: selectedPackage.price,
  });

  const handleToken = async (token, addresses) => {
    const response = await axios.post(
      `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/checkout` ||
        `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/checkout`,
      {
        token: token,
        product: product,
        name: name,
        email: email,
        password: password,
        instanceName: "",
        bundleId: selectedPackage.bundleId,
        blueprintId: selectedPackage.blueprintId,
        availabilityZone: "us-east-1a",
        packageNum: selectedPackage.number,
      }
    );

    const { status } = response.data;

    if (status === "success") {
      //!TODO setup creating a new account here once payment has been made
      toast.success("Your Payment has been made..");
      firebase.login(email, password);
      history.push("/home");
    } else {
      toast.error("There has been an error.");
    }
  };
  return (
    <div className="step-4">
      <h4>Your Package Information</h4>
      <Card style={{ paddingBottom: "10px" }}>
        <CardContent>
          <Package
            packageNum={selectedPackage.number}
            features={selectedPackage.features}
            price={selectedPackage.price}
            type="checkout"
          />
          +$25 Setup Fee <br />
          Total: ${selectedPackage.price + 25}
        </CardContent>
      </Card>
      <div style={{ padding: "10px" }} />
      <StripeCheckout
        stripeKey="pk_test_51ILfdTIx8kJ3JcBG3ugmbX7HlTbwfgZctbmjakQQ4bX4pMJhbbcRi51ackq1ufSre8xCuKXHkUT2SqLxyuGaE6CB00EE6vmY67"
        amount={product.price * 100}
        token={handleToken}
        billingAddress
        shippingAddress
      />
      <ToastContainer />
    </div>
  );
};

export default Step4;
