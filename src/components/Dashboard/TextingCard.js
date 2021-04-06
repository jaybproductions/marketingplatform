import React from "react";
import { Card, CardContent, Button, Grid } from "@material-ui/core";

function TextingCard() {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            Your Texting Info
          </Grid>
          <Grid item xs={12}>
            You have X unread messages.
          </Grid>
          <Grid item xs={12}>
            You have X number of total conversations.
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TextingCard;
