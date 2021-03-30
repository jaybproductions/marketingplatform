import React from "react";
import PricingTable from "./PricingTable";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "auto",
    padding: "20px",
  },
  paper: {
    height: 140,
    width: "100%",
  },
  control: {
    padding: theme.spacing(2),
  },
}));

//!TODO update feature list
const basicFeatures = ["good", "great", "best"];

//Pricing Table Container
const PricingContainer = () => {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Pricing</h1>
      <Grid container spacing={10} justify="center">
        <Grid item xs={6} md={6} lg={3}>
          <Paper className={classes.paper}>
            {" "}
            <PricingTable
              title="Basic Package"
              features={basicFeatures}
              price="$10"
              link="/checkout/1"
              buttonText="Get Started"
            />
          </Paper>
        </Grid>
        <Grid item xs={6} md={6} lg={3}>
          <Paper className={classes.paper}>
            <PricingTable
              title="Intermediate Package"
              features={basicFeatures}
              price="$25"
              link="/checkout/2"
              buttonText="Get Started"
            />
          </Paper>
        </Grid>
        <Grid item xs={6} md={6} lg={3}>
          <Paper className={classes.paper}>
            <PricingTable
              title="Custom Package"
              features={basicFeatures}
              price="Contact for more details."
              link="/checkout/3"
              buttonText="Get Started"
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PricingContainer;
