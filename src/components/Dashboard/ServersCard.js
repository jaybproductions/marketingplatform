import React from "react";
import { Card, CardContent, Button, Grid } from "@material-ui/core";

function ServersCard({ user }) {
  console.log(user);
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            Your Current Servers
          </Grid>
          <Grid item xs={12}>
            You have X servers active
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ServersCard;
