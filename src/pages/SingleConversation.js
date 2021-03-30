import React from "react";
import ConversationContainer from "../components/messaging/ConversationContainer";
import SendMessage from "../components/messaging/SendMessage";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CardContent, Card, CardHeader } from "@material-ui/core";
const SingleConversation = () => {
  const { contact } = useParams();
  return (
    <div className="messages">
      <Card>
        <CardContent>
          <Link to={"/messages"}>
            <ion-icon
              name="arrow-back-outline"
              style={{ fontSize: "24px", textAlign: "left" }}
            ></ion-icon>{" "}
          </Link>

          <div className="convo" style={{ paddingTop: "20px" }}>
            <ConversationContainer contact={contact} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleConversation;
