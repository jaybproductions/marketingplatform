import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Package = ({
  title,
  features,
  price,
  link,
  buttonText,
  selectedPackage,
  setSelectedPackage,
  packageNum,
}) => {
  const classes = useStyles();
  return (
    <>
      <div className="pricing-table">
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="span" component="h2">
          <div style={{ margin: "auto", alignItems: "left" }}>
            <ul style={{ textAlign: "left" }}>
              {features.map((feature) => (
                <>
                  <li style={{ fontSize: "16px" }}>{feature}</li>
                </>
              ))}
            </ul>
          </div>
        </Typography>
        <Typography className={classes.pos} color="textSecondary"></Typography>
        <Typography variant="body2" component="p">
          {price.toString()}
        </Typography>

        <Button
          size="small"
          onClick={(e) =>
            setSelectedPackage({ number: packageNum, price: price })
          }
        >
          {buttonText}
        </Button>
      </div>
    </>
  );
};

export default Package;
