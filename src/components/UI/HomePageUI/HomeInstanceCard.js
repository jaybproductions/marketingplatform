import React, { useState, useEffect } from "react";
import { Card, CardContent, Button } from "@material-ui/core";
import firebase from "../../../firebase";
import axios from "axios";
import { Link } from "react-router-dom";

const HomeInstanceCard = ({ user }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user) return;
    getUserData();
  }, [user]);

  const getUserData = async () => {
    const docRef = await firebase.db.collection("users").doc(user).get();
    const userData = docRef.data();
    setUserData(userData);
  };

  return (
    <>
      {userData && (
        <Card>
          <CardContent>
            You currently have {userData.awsInstances.length} instance(s)
            running.
            <br />
            <br />
            <Link to="/servers" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Go to Instances
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default HomeInstanceCard;
