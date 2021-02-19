import React from "react";
import ConversationContainer from "../components/messaging/ConversationContainer";
import SendMessage from "../components/messaging/SendMessage";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const SingleConversation = () => {
  const { contact } = useParams();
  return (
    <div className="messages">
      <Link to={"/messages"}>
        <button>Back to threads</button>{" "}
      </Link>
      <div className="convo" style={{ paddingTop: "20px" }}>
        <ConversationContainer contact={contact} />
      </div>
    </div>
  );
};

export default SingleConversation;
