import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import firebase from "../../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import "../../../css/Checkout.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "grid",
    placeItems: "center",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Basic Information",
    "Hosting Setup",
    "Twilio Setup",
    "Pay and Finalize",
  ];
}

export default function CheckoutStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(1);
  const steps = getSteps();
  const history = useHistory();

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Step1
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        );
      case 1:
        return (
          <Step2
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
          />
        );
      case 2:
        return <Step3 />;
      case 3:
        return (
          <Step4
            selectedPackage={selectedPackage}
            name={name}
            email={email}
            password={password}
          />
        );
      default:
        return "Unknown step";
    }
  }

  const isStepOptional = (step) => {
    return step === 5;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    if (!email || !name || !password) {
      toast.error("Some required info is missing...");
      return;
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    //if the current step is 0 add the form information to db as a lead
    if (activeStep === 0) {
      const docRef = await firebase.db.collection("leads").doc(email).get();
      //check to make sure they haven't already filled it out

      firebase.db.collection("leads").doc(email).set({
        name: name,
        email: email,
      });
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    if (activeStep === 0) return history.push("/home");
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <div className="checkout-heading" style={{ padding: "50px" }}>
        <h1 style={{ fontSize: "20px" }}>
          Please complete the steps below to finish the checkout process.
        </h1>
      </div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
              hello
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div className="checkout-buttons">
              <Button onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
