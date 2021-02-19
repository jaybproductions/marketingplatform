import React, { useState, useEffect, useContext } from "react";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";
import Contact from "./Contact";

const ContactList = () => {
  const { user } = useContext(UserContext);
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    getContacts();
  }, [user]);

  const getContacts = async () => {
    if (!user) {
      console.log("waiting to connect...");
    } else {
      let tempArr = [];
      const docRef = await firebase.db
        .collection("contacts")
        .where("user", "==", `${user.uid}`)
        .get();

      docRef.docs.forEach((doc) => {
        tempArr.push(doc.data());
      });
      setContacts(tempArr);
    }
  };
  return (
    <div className="contacts">
      {contacts &&
        contacts.map((contact, index) => (
          <>
            <Contact contact={contact} />
          </>
        ))}
    </div>
  );
};
export default ContactList;
