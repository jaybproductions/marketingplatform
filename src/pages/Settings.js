import React, { useContext, useState, useEffect } from "react";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";
import TwilioSection from "../components/UI/SettingsPageUI/TwilioSection";
import { GetUserData } from "../utils/API/User/api";

//!Not Finished
const Settings = () => {
  const { user } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!user) return;
    HandleGetUserDataFromFirebase();
  }, [user]);

  const HandleGetUserDataFromFirebase = async () => {
    const userData = await GetUserData(user.uid);
    setUserInfo(userData);
  };

  return (
    <div className="settings">
      {userInfo && <TwilioSection userInfo={userInfo} />}
    </div>
  );
};

export default Settings;
