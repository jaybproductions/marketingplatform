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
      const response = await axios.post(
        "http://localhost:5001/marketingplatform-3b5c7/us-central1/app/twilio/",
        newMessage
      );
      console.log(response.status);

      if (response.status === 200) {
        const docRef = firebase.db.collection("users").doc(user.uid);
        const snapshot = await docRef.get();
        console.log(snapshot.data().contacts);
        const checkContact = snapshot.data().contacts.forEach((item, index) => {
          if (item.phone == phone) {
            console.log("contact found - no need to add new conversation");
            convoArr.push(
              { message: message, timestamp: Date.now() },
              ...item.conversation
            );
            const messageDB = { message: message, timestamp: Date.now() };
            console.log(item.conversation);
            console.log(convoArr);
            //docRef.update({
            //contacts: firebase.app.firestore.FieldValue.arrayUnion({
            //conversation: messageDB,
            // }),
            //});

            return;
          } else {
            console.log("searching for contact...");
          }
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
