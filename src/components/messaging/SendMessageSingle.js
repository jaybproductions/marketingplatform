import React, { useState, useContext } from "react";
import axios from "axios";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";

const SendMessageSingle = ({ number, userNum }) => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  let contactExists = false;

  const handleSubmit = async (e) => {
    console.log(number);
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
        console.log(contactRef);
        const contactData = contactRef.forEach((contact) => {
          console.log(contact.data());
          if (number === contact.data().phone) {
            console.log("contact exists");
            contactExists = true;
          }
        });
        if (!contactExists) {
          firebase.db.collection("contacts").doc().set({
            name: "",
            phone: number,
            user: user.uid,
          });
        }
      }
    }
  };
  return (
    <div className="send">
      <form>
        <label>
          Message:{" "}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessageSingle;
