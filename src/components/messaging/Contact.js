import { Paper } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "auto",
      width: "25%",
      height: "50px",
    },
  },
  paper: {
    "&:hover": {
      backgroundColor: "lightblue",
    },
  },
}));

const Contact = ({ contact }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link
        to={`/message/${contact.phone}`}
        style={{ color: "black", textDecoration: "none" }}
      >
        <Paper className={classes.paper}>
          <div className="text" style={{ padding: "15px" }}>
            {contact.name ? contact.name : contact.phone}
          </div>
        </Paper>
      </Link>
    </div>
  );
};

export default Contact;
