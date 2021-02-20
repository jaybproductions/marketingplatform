import React, { useState, useEffect, useContext } from "react";
import firebase from "../../../firebase";
import UserContext from "../../../contexts/UserContext";
import { Card, Button } from "@material-ui/core";
import axios from "axios";
import NewInstanceModal from "./NewInstanceModal";

const AWSInstance = () => {
  const { user } = useContext(UserContext);
  const [instances, setInstances] = useState(null);
  const [open, setOpen] = React.useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div className="instance" style={{ paddingTop: "10px" }}>
      {instances && (
        <>
          <div style={{ padding: "10px" }}>
            <h4>Your Current Instances</h4>
          </div>
          <Card>
            <div
              className="instance-data"
              style={{ padding: "10px", height: "100px" }}
            >
              {instances.name} <br />
              Public IP Address: {instances.publicIpAddress} -{" "}
              {instances.location.regionName} <br /> Current Status:{" "}
              {instances.state.name}
            </div>
            <div style={{ paddingBottom: "10px" }}>
              {" "}
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
                Buy New Instance
              </Button>
            </div>
          </Card>
        </>
      )}
      <NewInstanceModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default AWSInstance;
