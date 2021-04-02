import React, { useContext, useEffect, useState } from "react";

import UserContext from "../../../contexts/UserContext";
import SubscriptionCard from "./SubscriptionCard";
import { GetUserData } from "../../../utils/API/User/api";
import { GetStripeCustomerInfo } from "../../../utils/API/Stripe/api";

const CustomerInfoContainer = () => {
  const { user } = useContext(UserContext);
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);

  useEffect(() => {
    if (!user) return;
    HandleRetrieveStripeCustomerInfo();
  }, [user]);

  const HandleRetrieveStripeCustomerInfo = async () => {
    const {
      subscriptionInfo: { stripeCustomerID },
    } = await GetUserData(user.uid);

    const stripeCustomerData = await GetStripeCustomerInfo(stripeCustomerID);
    setSubscriptionInfo(stripeCustomerData);
  };

  return (
    <div className="billing-card">
      {user && (
        <>
          <SubscriptionCard customerInfo={subscriptionInfo} />{" "}
        </>
      )}
    </div>
  );
};

export default CustomerInfoContainer;
