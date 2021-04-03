import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import Package from "./Package";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 250,
    width: 200,
    padding: "20px",
  },
  control: {
    padding: theme.spacing(4),
  },
}));

const basicFeatures = [
  "Ram: 512MB",
  "CPU: 1 vCPU",
  "Storage: 20GB SSD",
  "Bandwidth: 1TB/m",
];

const intermediateFeatures = [
  "Ram: 2GB",
  "CPU: 1 vCPU",
  "Storage: 60GB SSD",
  "Bandwidth: 3TB/m",
];

const advancedFeatures = [
  "Ram: 4GB",
  "CPU: 2 vCPU",
  "Storage: 80GB SSD",
  "Bandwidth: 4TB/m",
];

const PackageContainer = ({ selectedPackage, setSelectedPackage }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12}>
        <h3>Please choose a server package...</h3>
      </Grid>

      <Grid item md={3}>
        <Paper
          className={classes.paper}
          style={
            selectedPackage.number === "1"
              ? {
                  borderStyle: "solid",
                  borderWidth: "5px",
                  borderColor: "blue",
                }
              : { borderStyle: "solid", borderWidth: "0px" }
          }
        >
          {" "}
          <Package
            title="Basic Package"
            features={basicFeatures}
            price={10}
            link=""
            buttonText="Choose"
            packageNum="1"
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
            blueprintId="wordpress"
            bundleId="nano_2_0"
          />
        </Paper>
      </Grid>
      <Grid item md={3}>
        <Paper
          className={classes.paper}
          style={
            selectedPackage.number === "2"
              ? {
                  borderStyle: "solid",
                  borderWidth: "5px",
                  borderColor: "blue",
                }
              : { borderStyle: "solid", borderWidth: "0px" }
          }
        >
          <Package
            title="Intermediate Package"
            features={intermediateFeatures}
            price={25}
            link=""
            buttonText="Choose"
            packageNum="2"
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
            blueprintId="wordpress"
            bundleId="small_2_0"
          />
        </Paper>
      </Grid>
      <Grid item md={3}>
        <Paper
          className={classes.paper}
          style={
            selectedPackage.number === "3"
              ? {
                  borderStyle: "solid",
                  borderWidth: "5px",
                  borderColor: "blue",
                }
              : { borderStyle: "solid", borderWidth: "0px" }
          }
        >
          <Package
            title="Advanced Package"
            features={advancedFeatures}
            price={50}
            link=""
            buttonText="Choose"
            packageNum="3"
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
            blueprintId="wordpress"
            bundleId="medium_2_0"
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PackageContainer;
