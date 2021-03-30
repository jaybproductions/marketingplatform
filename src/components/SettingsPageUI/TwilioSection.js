import React, { useState } from "react";
import { Paper } from "@material-ui/core";
const TwilioSection = ({ userInfo }) => {
  const [currentTwilioNum, setCurrentTwilioNum] = useState(userInfo.twilioNum);
  return (
    <div className="twilio-section" style={{ width: "50%", margin: "auto" }}>
      <Paper>
        <div className="twilio" style={{ padding: "10px" }}>
          <h3>Twilio Settings</h3>
          Your Twilio Number: <input value={currentTwilioNum} />
        </div>
      </Paper>
    </div>
  );
};

export default TwilioSection;
