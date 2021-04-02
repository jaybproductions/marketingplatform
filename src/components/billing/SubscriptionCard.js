import React, { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import {
  GetDueDate,
  GetProductInfo,
  GetCardInfo,
} from "../../utils/API/Stripe/api";

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
    if (!customerInfo) return;
    HandleGetStripeInfoFromApi();
  }, [customerInfo]);

  const HandleGetStripeInfoFromApi = async () => {
    const dueDate = await GetDueDate(customerInfo);
    setDue(dueDate);

    const productId = customerInfo.subscriptions.data[0].plan.product;
    const productData = await GetProductInfo(productId);
    setProduct(productData);

    const cardId = customerInfo.default_source;
    const customerId = customerInfo.id.toString();
    const cardInfo = await GetCardInfo(customerId, cardId);

    setCardInfo(cardInfo);
    console.log(cardInfo);
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
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Cost: ${customerInfo.subscriptions.data[0].plan.amount / 100}
                </Typography>
                {cardInfo && (
                  <Typography className={classes.pos} color="textSecondary">
                    Card: ***{cardInfo.card.last4}
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
