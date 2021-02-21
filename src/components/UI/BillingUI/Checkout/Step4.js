import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*TODO have user signup using auth and make sure user is added to db before processing payment 
to esnsure correct customer ID is added to db */

const Step4 = ({ selectedPackage, email, name, password }) => {
  const [token, setToken] = useState(null);
  const [product] = useState({
    name: selectedPackage.number,
    price: selectedPackage.price,
  });

  const handleToken = async (token, addresses) => {
    const response = await axios.post(
      `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/checkout/${selectedPackage.number}`,
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
      }
    );

    const { status } = response.data;

    if (status === "success") {
      toast.success("Your Payment has been made..");
    } else {
      toast.error("There hass been an error.");
    }
  };
  return (
    <div className="step-4">
      <h4>Finalize your account setup and pay...</h4>
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
