import React, { useState, useEffect, useContext } from "react";
import firebase from "../../../firebase";
import UserContext from "../../../contexts/UserContext";
import { Card, Button } from "@material-ui/core";
import axios from "axios";
import NewInstanceModal from "./NewInstanceModal";

//Display info about thier instance
const AWSInstance = ({ instance, index, allInstances }) => {
  const { user } = useContext(UserContext);
  const [currentInstance, setCurrentInstance] = useState(null);
  useEffect(() => {
    getInstances();
  }, [user]);
  const getInstances = async () => {
    if (!user) {
      console.log("waiting to connect");
    } else {
      let tempArr = [];
      let tempAll = allInstances;
      const docRef = await firebase.db.collection("users").doc(user.uid).get();
      const data = docRef.data();
      tempArr.push(instance);
      const response = await axios.get(
        `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/aws/getinstance/${instance.instanceName}` ||
          `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/aws/getinstance/${instance.instanceName}`
      );
      const instanceInfo = response.data;
      setCurrentInstance(instanceInfo.instance);
      console.log(
        instanceInfo.instance.state.name,
        instance.staticIpAllocated,
        instanceInfo.instance.isStaticIp
      );
      if (
        instanceInfo.instance.state.name === "running" &&
        instance.staticIpAllocated === false &&
        instanceInfo.instance.isStaticIp === false
      ) {
        const allocateIPResponse = await axios.post(
          `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/aws/allocateip` ||
            "http://localhost:5001/marketingplatform-3b5c7/us-central1/app/aws/allocateip",
          {
            instanceName: instanceInfo.instance.name,
            staticIpName: `StaticIp-${user.uid}`,
          }
        );
        console.log(allocateIPResponse.status);
        const updateRef = firebase.db.collection("users").doc(user.uid);
        const objIndex = tempArr.findIndex(
          (obj) => obj.staticIpAllocated === false
        );
        tempArr[objIndex].staticIpAllocated = true;
        const objToRemoveIndex = tempAll.findIndex(
          (obj) => obj.instanceName === instance.instanceName
        );

        tempAll.splice(objToRemoveIndex, 1, ...tempArr);

        updateRef.update({
          awsInstances: tempAll,
        });
      }
    }
  };

  return (
    <div className="instance" style={{ paddingTop: "10px" }}>
      {instance && (
        <>
          <div style={{ padding: "10px" }}></div>
          <Card>
            <div
              className="instance-data"
              style={{ padding: "10px", height: "150px" }}
            >
              <center>
                <h5>{instance.instanceName}</h5>
              </center>{" "}
              <br />
              <b>Public IP Address:</b>{" "}
              {currentInstance && <>{currentInstance.publicIpAddress}</>}
              <br />
              <b>Region: </b>
              {instance.availabilityZone} <br />
              {currentInstance && (
                <>
                  <b> Current Status:</b> {currentInstance.state.name}
                </>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default AWSInstance;
