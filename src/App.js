import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

//Route Imports
import Home from "./pages/Home";
import useAuth from "./hooks/useAuth";
import SocialPage from "./pages/Social";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Forgot from "./pages/Auth/Forgot";

//Context Imports
import UserContext from "./contexts/UserContext";
import Header from "./components/Header";
import Settings from "./pages/Settings";
import Websites from "./pages/Websites";
import Messages from "./pages/Messages";
import Billing from "./pages/Billing";

function App() {
  const [user, setUser] = useAuth();
  return (
    <>
      {" "}
      <UserContext.Provider value={{ user, setUser }}>
        <div
          className="content"
          style={{ paddingTop: "50px", margin: "auto", marginLeft: "200px" }}
        >
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/login">
              {" "}
              <Header component={<Login />} />
            </Route>
            <Route path="/home">
              {" "}
              <Header component={<Home />} />
            </Route>
            <Route path="/:userid/client/:client">
              {" "}
              <Header component={<SocialPage />} />
            </Route>
            <Route path="/signup">
              {" "}
              <Header component={<Signup />} />
            </Route>
            <Route path="/forgot">
              {" "}
              <Header component={<Forgot />} />
            </Route>
            <Route path="/settings">
              {" "}
              <Header component={<Settings />} />
            </Route>
            <Route path="/websites">
              {" "}
              <Header component={<Websites />} />
            </Route>
            <Route path="/billing">
              {" "}
              <Header component={<Billing />} />
            </Route>
            <Route path="/messages">
              {" "}
              <Header component={<Messages />} />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
