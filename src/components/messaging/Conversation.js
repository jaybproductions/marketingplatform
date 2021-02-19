import React, { useEffect, useState } from "react";
import SendMessageSingle from "./SendMessageSingle";
import { useParams } from "react-router-dom";
import firebase from "../../firebase";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Conversation = ({ conversation, user }) => {
  const { contact } = useParams();
  const [currentConvo, setCurrentConvo] = useState(null);
  const [currentContact, setCurrentContact] = useState(null);
  const [doesNameExist, setDoesNameExists] = useState(true);
  const [newContactName, setNewContactName] = useState(null);
  const [contactID, setContactID] = useState(null);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!conversation) {
      return;
    }
    getConvoDetails();
    getContact();
  }, [conversation, contact]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getConvoDetails = () => {
    let tempArr = [];
    tempArr.push(...conversation);

    const filtered = tempArr.filter((item) => {
      return item.from !== user.twilioNum;
    });

    if (!filtered) {
      return;
    } else {
      //setCurrentConvo(filtered[0].from);
    }
  };

  const getContact = async () => {
    let tempContactArr = [];
    const docRef = await firebase.db
      .collection("contacts")
      .where("phone", "==", `${contact}`)
      .where("user", "==", `${user.id}`)
      .get();

    docRef.forEach((doc) => {
      setContactID(doc.id);
      tempContactArr.push(doc.data());
      if (doc.data().name === "") {
        setDoesNameExists(false);
      }
    });
    setCurrentContact(tempContactArr[0]);
  };

  const handleAddContactName = (e) => {
    e.preventDefault();
    if (contactID) {
      const updateRef = firebase.db.collection("contacts").doc(contactID);

      updateRef.update({
        name: newContactName,
      });
    } else {
      console.log("contact not found, adding new..");
      const newupdateRef = firebase.db.collection("contacts").doc().set({
        name: newContactName,
        phone: contact,
        user: user.id,
      });
    }

    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Contact Name has been updated. Please refresh page to see changes.
        </Alert>
      </Snackbar>

      {doesNameExist && currentContact ? (
        currentContact.name
      ) : (
        <>
          <form>
            <label>
              Add Contact Name:{" "}
              <input
                type="text"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
              />
            </label>
            <Button type="submit" onClick={handleAddContactName}>
              Add
            </Button>
          </form>{" "}
        </>
      )}
      {contact}
      {conversation.map((msg, index) => (
        <>
          {user.twilioNum == msg.to ? (
            <>
              <div className="recieved">{msg.message}</div>
            </>
          ) : (
            <>
              <div className="sent">{msg.message}</div>{" "}
            </>
          )}{" "}
          <br />
        </>
      ))}
      {!conversation ? (
        <>
          <div>Start a new conversation</div>{" "}
        </>
      ) : (
        <>
          <SendMessageSingle number={contact} userNum={user.twilioNum} />
        </>
      )}
    </div>
  );
};

export default Conversation;
