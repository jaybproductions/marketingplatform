import React, { useState } from "react";
import AWSInstance from "../components/UI/BillingUI/AWSInstance";
import { Button } from "@material-ui/core";
import NewInstanceModal from "../components/UI/BillingUI/NewInstanceModal";
import AWSInstanceContainer from "../components/UI/BillingUI/AWSInstanceContainer";

const Servers = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div className="servers">
      <h4>Your Current Instances</h4>
      <AWSInstanceContainer />
      <div style={{ padding: "30px" }}>
        {" "}
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Buy New Instance
        </Button>
      </div>
      <NewInstanceModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Servers;
