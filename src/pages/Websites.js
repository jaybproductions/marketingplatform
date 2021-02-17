import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";
const Websites = () => {
  const [newWebsite, setNewWebsite] = useState("");
  const [currentWebsite, setCurrentWebsite] = useState("");
  const { user } = useContext(UserContext);
  useEffect(() => {
    getData();
  }, [user]);

  const getData = () => {
    if (!user) {
      console.log("waiting to connect");
    } else {
      const docRef = firebase.db.collection("users").doc(user.uid);
      docRef.get().then((doc) => {
        console.log(doc.data());
        setCurrentWebsite(doc.data().websites[0]);
      });
      console.log(newWebsite);
    }
  };

  const handleSubmit = (e) => {
    let websiteArr = [];
    e.preventDefault();
    if (!user) {
      console.log("waiting to connect");
    } else {
      const docRef = firebase.db.collection("users").doc(user.uid);
      docRef.get().then((doc) => {
        console.log(doc.data());
        websiteArr.push(newWebsite, ...doc.data().websites);
        console.log(websiteArr);
        docRef.update({
          websites: websiteArr,
        });
      });

      console.log(newWebsite);
    }
  };

  return (
    <div className="websites">
      <h1>Websites Page</h1>
      <p>This is where your websites will go.</p>
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
        <iframe
          src={"https://" + currentWebsite}
          width="80%"
          height="1000px"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Websites;
