import React, { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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

const SubscriptionCard = ({ customerInfo }) => {
  const classes = useStyles();
  const [product, setProduct] = useState(null);
  const [due, setDue] = useState(null);
  const [cardInfo, setCardInfo] = useState(null);

  useEffect(() => {
    getSubscriptionItems();
  }, [customerInfo]);

  const getSubscriptionItems = async () => {
    //check if there is any customerInfo
    if (customerInfo) {
      const utcSeconds =
        customerInfo.subscriptions.data[0].current_period_end * 1000;
      let d = new Date(utcSeconds);
      setDue(d.toLocaleDateString());

      const productID = customerInfo.subscriptions.data[0].plan.product;
      const response = await axios.get(
        `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/getsubscription/${productID}` ||
          `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/getsubscription/${productID}`
      );
      console.log(response.data);
      setProduct(response.data);
      const cardID = customerInfo.default_source;
      const customerID = customerInfo.id.toString();

      const cardResponse = await axios.get(
        `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/${customerID}/getcard/${cardID}` ||
          `http://localhost:5001/marketingplatform-3b5c7/us-central1/app/${customerID}/getcard/${cardID}`
      );

      setCardInfo(cardResponse.data);
      console.log(cardResponse.data);
    }
  };

  return (
    <div className="sub-card">
      {customerInfo && (
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Your Current Products
            </Typography>
            {product && (
              <>
                {" "}
                <Typography variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Next Billing Date:
                  {due}
                  {customerInfo.subscriptions.data[0].days_until_due}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Cost: ${customerInfo.subscriptions.data[0].plan.amount / 100}
                </Typography>
                {cardInfo && (
                  <Typography className={classes.pos} color="textSecondary">
                    Card: ***{/*cardInfo.card.last4*/}
                  </Typography>
                )}
              </>
            )}
          </CardContent>
          <CardActions>
            <Button size="small">Update Card Info</Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default SubscriptionCard;