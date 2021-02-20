import React from "react";
import AWSInstance from "../components/UI/BillingUI/AWSInstance";
import BillingCardInfo from "../components/UI/BillingUI/BillingCardInfo";

const Billing = () => {
  return (
    <div className="billing">
      <BillingCardInfo />

      <AWSInstance />
    </div>
  );
};

export default Billing;
