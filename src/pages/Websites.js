import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";
import { Button } from "@material-ui/core";
const Websites = () => {
  const [newWebsite, setNewWebsite] = useState("");
  const [currentWebsites, setCurrentWebsites] = useState("");
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user) return;
    getData();
  }, [user]);

  const getData = () => {
    const docRef = firebase.db.collection("users").doc(user.uid);
    docRef.get().then((doc) => {
      setCurrentWebsites(doc.data().websites);
    });
  };

  const handleSubmit = (e) => {
    let websiteArr = [];
    e.preventDefault();

    const docRef = firebase.db.collection("users").doc(user.uid);
    docRef.get().then((doc) => {
      websiteArr.push(newWebsite, ...doc.data().websites);

      docRef.update({
        websites: websiteArr,
      });
    });

    console.log(newWebsite);
  };

  return (
    <div className="websites">
      <form>
        <label>
          Enter a new website to monitor(in "domain.com" format <br />
          <input
            type="text"
            value={newWebsite}
            onChange={(e) => setNewWebsite(e.target.value)}
            width="100%"
          />
        </label>
        <button
          type="button"
          className="btn btn-warning"
          onClick={handleSubmit}
        >
          Add
        </button>
      </form>
      <div className="website-to-show">
        {currentWebsites &&
          currentWebsites.map((website, index) => (
            <Button key={index}>
              <a href={"http://" + website} target="_blank">
                {website}
              </a>
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Websites;
