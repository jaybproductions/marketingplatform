import React, { useEffect } from "react";
import firebase from "../firebase";

function useAuth() {
  const [authUser, setAuthUser] = React.useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return [authUser, setAuthUser];
}

export default useAuth;
