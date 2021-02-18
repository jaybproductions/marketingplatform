import React from "react";
import BillingCardInfo from "../components/UI/BillingUI/BillingCardInfo";
import SubscriptionCard from "../components/UI/BillingUI/SubscriptionCard";

const Billing = () => {
  return (
    <div className="billing">
      <h3>This is the billing information page.</h3>
      <BillingCardInfo />
    </div>
  );
};

export default Billing;
