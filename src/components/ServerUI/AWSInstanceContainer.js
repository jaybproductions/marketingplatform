import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Card, Button } from "@material-ui/core";
import NewInstanceModal from "./NewInstanceModal";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import AWSInstance from "./AWSInstance";
import { GetAWSInstanceData } from "../../utils/API/AWS/api";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AWSInstanceContainer = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [instances, setInstances] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    HandleRetrieveDataFromApi();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [user]);

  const HandleRetrieveDataFromApi = async () => {
    const awsInstancesData = await GetAWSInstanceData(user.uid);
    setInstances(awsInstancesData);
  };
  return (
    <div className="instance" style={{ display: "grid", placeItems: "center" }}>
      {isLoading && (
        <div className={classes.root}>
          <LinearProgress />
          Loading Instances...
        </div>
      )}
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
