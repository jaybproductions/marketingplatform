import React, { useState, useContext } from "react";
import axios from "axios";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";
import { TextField, Button } from "@material-ui/core";

const SendMessageSingle = ({ number, userNum }) => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  let contactExists = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let convoArr = [];

    if (!user) {
      console.log("waiting to connect");
    } else {
      const phoneNumber = number;
      const newMessage = {
        message: message,
        phone: phoneNumber,
        from: userNum,
        timestamp: Date.now(),
      };

      const response = await axios.post(
        `https://us-central1-marketingplatform-3b5c7.cloudfunctions.net/app/twilio/` ||
          "http://localhost:5001/marketingplatform-3b5c7/us-central1/app/twilio/",
        newMessage
      );
      console.log(response.status);

      if (response.status === 200) {
        const userRef = firebase.db.collection("users").doc(user.uid);
        const docRef = firebase.db.collection("messages").doc();
        const userSnapshot = await userRef.get();
        const userData = userSnapshot.data();
        const snapshot = await docRef.set({
          message: message,
          to: number,
          from: userData.twilioNum,
          timestamp: Date.now(),
        });
        const contactRef = await firebase.db.collection("contacts").get();

        const contactData = contactRef.forEach((contact) => {
          if (
            number === contact.data().phone &&
            contact.data().user === user.uid
          ) {
            console.log("contact exists");
            contactExists = true;
          }
        });
        if (!contactExists) {
          console.log("contact doesnt exit");
          firebase.db.collection("contacts").doc().set({
            name: "",
            phone: number,
            user: user.uid,
          });
        }
      }
      setMessage("");
      document.getElementById("message").scrollIntoView();
    }
  };
  return (
    <div className="send">
      <form>
        <div style={{ width: "100%", margin: "auto" }}>
          <TextField
            type="text"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            fullWidth
          />
          <div style={{ display: "inline", paddingTop: "10px" }} />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
            fullWidth
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMessageSingle;
