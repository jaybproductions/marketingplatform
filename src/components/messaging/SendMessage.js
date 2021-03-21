import React, { useState, useContext } from "react";
import axios from "axios";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";

const SendMessage = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let convoArr = [];

    const newMessage = {
      message: message,
      phone: phone,
    };
    if (!user) {
      console.log("waiting to connect");
    } else {
      const newMessage = {
        message: message,
        phone: phone,
        from: user.twilioNum,
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
          phone: "+1" + phone,
          from: userData.twilioNum,
          timestamp: Date.now(),
        });
      }
    }
  };
  return (
    <div className="send">
      <form>
        <label>
          Phone Number:{" "}
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
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

export default SendMessage;
