import React, { useState } from "react";
import { Button } from "@material-ui/core";
import NewInstanceModal from "../components/server/NewInstanceModal";
import AWSInstanceContainer from "../components/server/AWSInstanceContainer";

//Container for ServerInformation
const Servers = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div className="servers">
      <h4>Current Instances</h4>
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
