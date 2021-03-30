import React, { useState, useEffect, useContext } from "react";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";
import { Card, Button } from "@material-ui/core";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

//Display info about thier instance
const AWSInstance = ({ instance, index, allInstances }) => {
  const { user } = useContext(UserContext);
  const [currentInstance, setCurrentInstance] = useState(null);
  useEffect(() => {
    if (!user) return;
    getInstances();
  }, [user]);
  const getInstances = async () => {
    let tempArr = [];
    let tempAll = allInstances;

    tempArr.push(instance);
    const response = await axios.get(
      `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/aws/getinstance/${instance.instanceName}` ||
        `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/aws/getinstance/${instance.instanceName}`
    );
    const instanceInfo = response.data;
    setCurrentInstance(instanceInfo.instance);
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

      if (allocateIPResponse.status === 200) {
        toast.warn(
          "Your Static IP has been assigned. Please refresh the page."
        );
      }
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
  };

  return (
    <div className="instance" style={{ paddingTop: "10px" }}>
      {instance && (
        <>
          <div style={{ padding: "10px" }} />
          <Card>
            <div
              className="instance-data"
              style={{ padding: "10px", height: "100%", textAlign: "center" }}
            >
              <h5>{instance.instanceName}</h5>
              <ion-icon
                name="server-outline"
                style={{ fontSize: "60px" }}
              ></ion-icon>{" "}
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
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default AWSInstance;
