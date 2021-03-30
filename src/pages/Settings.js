import React, { useContext, useState, useEffect } from "react";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";
import TwilioSection from "../components/SettingsPageUI/TwilioSection";

//!Not Finished
const Settings = () => {
  const { user } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getUserData();
  }, [user]);

  const getUserData = async () => {
    if (!user) {
      console.log("waiting to connect");
    } else {
      const docRef = await firebase.db.collection("users").doc(user.uid).get();
      setUserInfo(docRef.data());
    }
  };

  return (
    <div className="settings">
      {userInfo && <TwilioSection userInfo={userInfo} />}
    </div>
  );
};

export default Settings;
