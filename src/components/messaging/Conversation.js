import React, { useEffect, useState } from "react";
import SendMessageSingle from "./SendMessageSingle";
import { useParams } from "react-router-dom";

const Conversation = ({ conversation, user }) => {
  const { contact } = useParams();
  const [currentConvo, setCurrentConvo] = useState(null);
  useEffect(() => {
    console.log(contact);
    if (!conversation) {
      return;
    }
    getConvoDetails();
  }, [conversation]);

  const getConvoDetails = () => {
    console.log(conversation);
    let tempArr = [];
    tempArr.push(...conversation);

    const filtered = tempArr.filter((item) => {
      return item.from !== user.twilioNum;
    });

    console.log(filtered);
    if (!filtered) {
      return;
    } else {
      //setCurrentConvo(filtered[0].from);
    }
  };

  return (
    <div className="conversation">
      Conversation with: {contact}
      {conversation.map((msg, index) => (
        <>
          {user.twilioNum == msg.to ? (
            <>
              <div className="recieved">{msg.message}</div>
            </>
          ) : (
            <>
              <div className="sent">{msg.message}</div>{" "}
            </>
          )}{" "}
          <br />
        </>
      ))}
      {!conversation ? (
        <>
          <div>Start a new conversation</div>{" "}
        </>
      ) : (
        <>
          <SendMessageSingle number={contact} userNum={user.twilioNum} />
        </>
      )}
    </div>
  );
};

export default Conversation;
