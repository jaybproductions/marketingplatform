import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import { Card, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

import NewInstanceModal from "./NewInstanceModal";

import {
  GetSingleAwsInstance,
  AssignStaticIp,
} from "../../../utils/API/AWS/api";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

//Display info about thier instance
const AWSInstance = ({ instance, index, allInstances }) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [currentInstance, setCurrentInstance] = useState(null);
  useEffect(() => {
    if (!user) return;
    HandleRetrieveDataFromApi();
  }, [user]);

  useEffect(() => {
    if (!currentInstance) return;
    HandleAssignStaticIp();
  }, [currentInstance]);

  const HandleRetrieveDataFromApi = async () => {
    const awsInstance = await GetSingleAwsInstance(instance);
    setCurrentInstance(awsInstance.instance);
  };

  const HandleAssignStaticIp = async () => {
    const AssignStaticIpCall = await AssignStaticIp(user.uid, currentInstance);
    return AssignStaticIpCall;
  };

  return (
    <div className="instance" style={{ paddingTop: "10px" }}>
      {instance && (
        <>
          {currentInstance && (
            <>
              {currentInstance.state.name !== "running" ||
              !currentInstance.isStaticIp ? (
                <div className={classes.root}>
                  <LinearProgress />
                  Please wait while we setup your instance.
                </div>
              ) : (
                <>
                  {" "}
                  <div style={{ padding: "10px" }} />
                  <Card>
                    <div
                      className="instance-data"
                      style={{
                        padding: "10px",
                        height: "100%",
                        textAlign: "center",
                      }}
                    >
                      <h5>{instance.instanceName}</h5>
                      <ion-icon
                        name="server-outline"
                        style={{ fontSize: "60px" }}
                      ></ion-icon>{" "}
                      <br />
                      <b>Public IP Address:</b>{" "}
                      {currentInstance && (
                        <>{currentInstance.publicIpAddress}</>
                      )}
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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AWSInstance;
