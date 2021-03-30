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

const PricingTable = ({ title, features, price, link, buttonText }) => {
  const classes = useStyles();
  return (
    <div className="pricing-table">
      <Card className={classes.root} variant="outlined">
        <CardContent>
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
          <Typography
            className={classes.pos}
            color="textSecondary"
          ></Typography>
          <Typography variant="body2" component="p">
            {price}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={link} style={{ textDecoration: "none" }}>
            <Button size="small">{buttonText}</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default PricingTable;
