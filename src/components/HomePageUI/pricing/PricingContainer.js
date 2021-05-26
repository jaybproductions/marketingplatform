import React from "react";
import PricingTable from "./PricingTable";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

//!TODO update feature list
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

//Pricing Table Container
const PricingContainer = () => {
  return (
    <div style={{ paddingTop: "100px", paddingBottom: "100px" }} id="pricing">
      <div className="pricing-header" style={{ padding: "20px" }}>
        <h1>Pricing</h1>
      </div>

      <Grid container spacing={4} justify="center">
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <PricingTable
            title="Basic Package"
            features={basicFeatures}
            price="$10"
            link="/checkout/1"
            buttonText="Get Started"
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <PricingTable
            title="Intermediate Package"
            features={intermediateFeatures}
            price="$25"
            link="/checkout/2"
            buttonText="Get Started"
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <PricingTable
            title="Advanced Package"
            features={advancedFeatures}
            price="$50"
            link="/checkout/3"
            buttonText="Get Started"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PricingContainer;
