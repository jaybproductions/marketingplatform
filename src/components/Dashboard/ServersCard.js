import React from "react";
import { Card, CardContent, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

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
            {user && (
              <> You have {user.awsInstances.length} server(s) active </>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              to="/servers"
              component={Link}
            >
              Go to Servers
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ServersCard;
