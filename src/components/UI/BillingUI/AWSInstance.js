import React, { useState, useEffect, useContext } from "react";
import firebase from "../../../firebase";
import UserContext from "../../../contexts/UserContext";
import { Card, Button } from "@material-ui/core";
import axios from "axios";
import NewInstanceModal from "./NewInstanceModal";

const AWSInstance = () => {
  const { user } = useContext(UserContext);
  const [instances, setInstances] = useState(null);

  useEffect(() => {
    getInstances();
  }, [user]);
  const getInstances = async () => {
    if (!user) {
      console.log("waiting to connect");
    } else {
      const docRef = await firebase.db.collection("users").doc(user.uid).get();
      const data = docRef.data();
      console.log(data);

      console.log(instances);
      const response = await axios.get(
        `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/aws/getinstance/${data.awsInfo.instance}`
      );
      const instanceInfo = response.data;
      console.log(instanceInfo);
      setInstances(instanceInfo.instance);
    }
  };

  return (
    <div className="instance" style={{ paddingTop: "10px" }}>
      {instances && (
        <>
          <div style={{ padding: "10px" }}></div>
          <Card>
            <div
              className="instance-data"
              style={{ padding: "10px", height: "150px" }}
            >
              <center>
                <h5>{instances.name}</h5>
              </center>{" "}
              <br />
              <b>Public IP Address:</b> {instances.publicIpAddress}
              <br />
              <b>Region: </b>
              {instances.location.regionName} <br />
              <b> Current Status:</b> {instances.state.name}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default AWSInstance;
