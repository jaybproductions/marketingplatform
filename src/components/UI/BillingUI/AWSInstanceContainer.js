import React, { useState, useEffect, useContext } from "react";
import firebase from "../../../firebase";
import UserContext from "../../../contexts/UserContext";
import { Card, Button } from "@material-ui/core";
import axios from "axios";
import NewInstanceModal from "./NewInstanceModal";
import AWSInstance from "./AWSInstance";
import { GetAWSInstanceData } from "../../../utils/API/AWS/api";

const AWSInstanceContainer = () => {
  const { user } = useContext(UserContext);
  const [instances, setInstances] = useState(null);

  useEffect(() => {
    if (!user) return;
    HandleRetrieveDataFromApi();
  }, [user]);

  const HandleRetrieveDataFromApi = async () => {
    const awsInstancesData = await GetAWSInstanceData(user.uid);
    setInstances(awsInstancesData);
  };
  return (
    <div className="instance" style={{ paddingTop: "10px" }}>
      {instances && (
        <>
          <div style={{ padding: "10px" }}></div>
          {instances.map((instance, index) => (
            <div key={index}>
              <AWSInstance
                instance={instance}
                index={index}
                allInstances={instances}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AWSInstanceContainer;
