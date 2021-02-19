import React from "react";
import ConversationList from "../components/messaging/ConversationList";
import SendMessage from "../components/messaging/SendMessage";
import { useParams } from "react-router-dom";
import ContactList from "../components/messaging/ContactList";
const Messages = () => {
  const { contact } = useParams();
  return (
    <div className="messages">
      <h1>Messages Page</h1>
      <ContactList />
    </div>
  );
};

export default Messages;
