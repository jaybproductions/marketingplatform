import React from "react";
import { useParams } from "react-router-dom";
import ContactList from "../components/messaging/ContactList";
const Messages = () => {
  const { contact } = useParams();
  return (
    <div className="messages">
      <h3>Your Open Conversations</h3>
      <ContactList />
    </div>
  );
};

export default Messages;
