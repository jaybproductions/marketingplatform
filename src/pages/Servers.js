import React, { useState } from "react";
import { Button } from "@material-ui/core";
import NewInstanceModal from "../components/ServerUI/NewInstanceModal";
import AWSInstanceContainer from "../components/ServerUI/AWSInstanceContainer";

//Container for ServerInformation
const Servers = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div className="servers">
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
