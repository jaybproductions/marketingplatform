import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    width: "100%",
    margin: "auto",
  },
  media: {
    height: 500,
    width: "100%",
    margin: "auto",
    objectFit: "contain",
  },
  modal: {
    width: "100vw",
    height: "100vh",
    margin: "auto",
    maxWidth: "md",
  },
});

const EventModal = ({ openEvent, handleClose, eventDetails }) => {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={openEvent}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">View Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {eventDetails &&
              Object.values(eventDetails).map((item, index) => (
                <>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <img className={classes.media} src={item.imageUrl} />
                    </CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                      ></Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="article"
                      >
                        <b>Post Description: </b>
                        {item.description}
                        <br />
                        <b>Hashtags:</b> {item.hashtags}
                        <br />
                        <b>Platform(s):</b> {item.platform}
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </>
              ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default EventModal;
