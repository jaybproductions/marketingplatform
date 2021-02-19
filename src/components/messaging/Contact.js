import { Card, Paper } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const Contact = ({ contact }) => {
  return (
    <div
      className="contact"
      style={{ width: "50%", margin: "auto", padding: "10px" }}
    >
      <Link to={`/message/${contact.phone}`}>
        <Paper>
          {contact.name}
          <br />
          {contact.phone}
        </Paper>
      </Link>
    </div>
  );
};

export default Contact;
