import React from "react";
import ContactList from "../components/messaging/ContactList";

//Base messages page
const Messages = () => {
  return (
    <div className="messages">
      <h3>Your Open Conversations</h3>
      <ContactList />
    </div>
  );
};

export default Messages;
