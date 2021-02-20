import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const Step4 = () => {
  const [token, setToken] = useState(null);

  const handleToken = (token, addresses) => {};
  return (
    <div className="step-4">
      <h1>This is step 4</h1>
      <StripeCheckout
        stripeKey="sk_test_51ILfdTIx8kJ3JcBGCZXdcQe0Zgqc43pqbu2vm1yrMUIMRXHYBSLCd7Vja6L4iwdPAktm8HE6oTTtVoT0f2d8xWZw008UEjBJce"
        amount={100000}
        token={handleToken}
      />
    </div>
  );
};

export default Step4;
