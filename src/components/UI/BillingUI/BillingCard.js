import React, { useContext, useEffect, useState } from "react";
import { Card } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import UserContext from "../../../contexts/UserContext";
import firebase from "../../../firebase";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const BillingCard = ({ customerInfo }) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  return (
    <div className="billing-card">
      {customerInfo && (
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Your Current Subscription
            </Typography>
            <Typography variant="h5" component="h2">
              Monthly Amount: ${customerInfo.subscriptionInfo.monthlyAmount}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Next Due Date: {customerInfo.subscriptionInfo.due}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default BillingCard;
