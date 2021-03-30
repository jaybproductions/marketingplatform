import React from "react";
import ContactList from "../components/messaging/ContactList";

//Base messages page
const Messages = () => {
  return (
    <div className="message-page">
      <h3 style={{textAlign: 'center'}}>Your Open Conversations</h3>
      <ContactList />
    </div>
  );
};

export default Messages;
