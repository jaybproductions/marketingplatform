import React from "react";
import { Card, CardContent, Button, Grid } from "@material-ui/core";

function SocialCard() {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            Your Social Posts
          </Grid>
          <Grid item xs={12}>
            You have X posts scheduled for today.
          </Grid>
          <Grid item xs={12}>
            You have X posts scheduled for this month.
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default SocialCard;
