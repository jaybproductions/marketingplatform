import React, { useState, useContext, useEffect } from "react";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";
import Conversation from "./Conversation";

const ConversationList = ({ contact }) => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [recieved, setRecieved] = useState(null);
  const [sent, setSent] = useState(null);

  useEffect(() => {
    getMessages();
  }, [user]);

  useEffect(() => {
    if (!sent || !recieved) {
      return;
    }
    handleSort();
  }, [sent, recieved]);
  const getMessages = async () => {
    if (!user) {
      console.log("waiting to connect");
    } else {
      const userDocRef = firebase.db.collection("users").doc(user.uid);
      const snapshot = await userDocRef.get();
      const userData = snapshot.data();
      setUserInfo(userData);

      firebase.db
        .collection("messages")
        .where("from", "==", `${contact}`)
        .onSnapshot(handleRecievedSnapshot);

      firebase.db
        .collection("messages")
        .where("to", "==", `${contact}`)
        .onSnapshot(handleSentSnapshot);

      firebase.db.collection("contacts");
    }
  };

  const handleRecievedSnapshot = (snapshot) => {
    const recieved = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setRecieved(recieved);
  };

  const handleSentSnapshot = (snapshot) => {
    const sent = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setSent(sent);
  };

  const handleSort = () => {
    let tempArr = [];
    let filteredArr = [];
    tempArr.push(...sent, ...recieved);

    const filtered = tempArr.filter((item) => {
      if (item.to == userInfo.twilioNum || item.from == userInfo.twilioNum) {
        filteredArr.push(item);
        return false;
      } else {
        return true;
      }
    });
    const sorted = filteredArr.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });

    setMessages(sorted);
  };

  return (
    <div>
      {messages && (
        <>
          <Conversation conversation={messages} user={userInfo} />
        </>
      )}
    </div>
  );
};

export default ConversationList;
