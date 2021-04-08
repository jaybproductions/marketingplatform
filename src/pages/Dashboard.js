import React, { useEffect, useState, useContext } from "react";
import { Card, CardContent, Button, Grid } from "@material-ui/core";
import ServersCard from "../components/Dashboard/ServersCard";
import SocialCard from "../components/Dashboard/SocialCard";
import TextingCard from "../components/Dashboard/TextingCard";
import { GetUserData } from "../utils/API/User/api";
import UserContext from "../contexts/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user) return;
    handleGetDataFromApi();
  }, [user]);
  const handleGetDataFromApi = async () => {
    const userData = await GetUserData(user.uid);
    setUserData(userData);
  };
  return (
    <div
      className="dashboard"
      style={{
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "100px",
      }}
    >
      <h4>Hello {userData && userData.name},</h4>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} md={3} lg={3}>
          <ServersCard user={userData} />
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <SocialCard user={user.uid} />
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <TextingCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
