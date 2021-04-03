import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
  blueprintId,
  bundleId,
  availabilityZone,
  type,
}) => {
  const classes = useStyles();
  return (
    <>
      <div className="package-table">
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
          {"$" + price.toString() + " per month"}
        </Typography>

        {type != "checkout" && (
          <Button
            size="md"
            color="primary"
            variant="contained"
            onClick={(e) =>
              setSelectedPackage({
                number: packageNum,
                price: price,
                blueprintId: blueprintId,
                bundleId: bundleId,
                title: title,
                features: features,
                availabilityZone: availabilityZone,
              })
            }
          >
            Select
          </Button>
        )}
      </div>
    </>
  );
};

export default Package;
