import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

/*TODO have user signup using auth and make sure user is added to db before processing payment 
to esnsure correct customer ID is added to db */

const Step4 = () => {
  const [token, setToken] = useState(null);
  const [product] = useState({
    name: "Package 1",
    price: 10,
  });

  const handleToken = async (token, addresses) => {
    const response = await axios.post(
      "http://localhost:5001/marketingplatform-3b5c7/us-central1/app/checkout",
      {
        token: token,
        product: product,
      }
    );

    const { status } = response.data;

    if (status === "success") {
      console.log("success");
    } else {
      console.log("failed");
    }
  };
  return (
    <div className="step-4">
      <h1>This is step 4</h1>
      <StripeCheckout
        stripeKey="pk_test_51ILfdTIx8kJ3JcBG3ugmbX7HlTbwfgZctbmjakQQ4bX4pMJhbbcRi51ackq1ufSre8xCuKXHkUT2SqLxyuGaE6CB00EE6vmY67"
        amount={product.price * 100}
        token={handleToken}
        billingAddress
        shippingAddress
      />
    </div>
  );
};

export default Step4;
