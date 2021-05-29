import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Package from "./Package";
import { Card, CardContent } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { handleCheckout } from "../../../utils/API/Stripe/api";
import { createAwsInstance } from "../../../utils/API/AWS/api";

//Finalize checkout and process payment through stripe -- create firebase account --
const Step4 = ({ selectedPackage, email, name, password }) => {
  let history = useHistory();
  const [token, setToken] = useState(null);
  const [product] = useState({
    name: selectedPackage.number,
    price: selectedPackage.price,
  });

  //this function handles the checkout process and creating a new user in fb - returns userid
  const handleToken = async (token, addresses) => {
    const checkoutData = {
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
    };
    //!after checkout handle create instance // allocate static ip from aws routes
    const response = await handleCheckout(checkoutData);
    console.log(response);
    const { status, userId } = response;

    if (status === "success") {
      console.log(userId);
      toast.success("Your Payment has been made..");
      //handle creating instances and allocating static here -
      const createInstanceResponse = await createAwsInstance(
        checkoutData,
        userId
      );

      //console.log(createInstanceResponse);
      //only want to create instance if payment is made
      history.push("/login");
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
