import React, { useContext, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import UserContext from "../../../contexts/UserContext";
import firebase from "../../../firebase";
import axios from "axios";
import SubscriptionCard from "./SubscriptionCard";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const BillingCardInfo = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const docRef = firebase.db.collection("users");
  const baseURL = "https://api.stripe.com";

  useEffect(() => {
    getData();
  }, [user]);

  const getData = async () => {
    if (!user) {
      console.log("waiting to connect");
    } else {
      const snapshot = await docRef.doc(user.uid).get();
      console.log(snapshot.data());
      const customerId = snapshot.data().subscriptionInfo.stripeCustomerID;
      setData(snapshot.data());
      const response = await axios.get(
        `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/getcustomer/${customerId}` ||
          `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/getcustomer/${customerId}`
      );
      setSubscriptionInfo(response.data);
      console.log(response.data);
    }
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

export default BillingCardInfo;
