import React, { useState, useEffect, useContext } from "react";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";
import Contact from "./Contact";
import { Button, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SendMessage from "./SendMessage";
import SendMessageSingle from "./SendMessageSingle";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ContactList = () => {
  const { user } = useContext(UserContext);
  const [contacts, setContacts] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [number, setNumber] = useState("");
  const history = useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStartMessage = () => {
    const phoneno = /^\d{10}$/;
    if (phoneno.test(number)) {
      return history.push(`/message/+1${number}`);
    } else {
      toast.error("Please enter a valid phone number");
      return false;
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    getContacts();
  }, [user]);

  const getContacts = async () => {
    let tempArr = [];
    const docRef = await firebase.db
      .collection("contacts")
      .where("user", "==", `${user.uid}`)
      .get();

    docRef.docs.forEach((doc) => {
      tempArr.push(doc.data());
    });
    setContacts(tempArr);
  };

  return (
    <div className="contacts">
      <center>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          New Message
        </Button>
      </center>
      {contacts &&
        contacts.map((contact, index) => (
          <div key={index} style={{ padding: "5px" }}>
            <Contact contact={contact} />
          </div>
        ))}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent style={{ height: "100px" }}>
          <TextField
            label="Please enter phone number"
            type="tel"
            variant="outlined"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          <Button id="start" onClick={handleStartMessage} color="primary">
            Start Conversation
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};
export default ContactList;
