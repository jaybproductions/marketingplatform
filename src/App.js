import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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
import Header from "./components/UI/Header/Header";
import Settings from "./pages/Settings";
import Websites from "./pages/Websites";
import Messages from "./pages/Messages";
import Billing from "./pages/Billing";
import SingleConversation from "./pages/SingleConversation";
import Checkout from "./pages/Checkout";
import Servers from "./pages/Servers";

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
              <Header title={"Home"} component={<Home />} />
            </Route>
            <Route path="/:userid/client/:client">
              {" "}
              <Header title="Social Calendar" component={<SocialPage />} />
            </Route>
            <Route path="/signup">
              {" "}
              <Header title="Sign Up" component={<Signup />} />
            </Route>
            <Route path="/forgot">
              {" "}
              <Header title="Forgot Password" component={<Forgot />} />
            </Route>
            <Route path="/settings">
              {" "}
              <Header title="Settings" component={<Settings />} />
            </Route>
            <Route path="/websites">
              {" "}
              <Header title="Websites" component={<Websites />} />
            </Route>
            <Route path="/billing">
              {" "}
              <Header title="Billing" component={<Billing />} />
            </Route>
            <Route path="/messages">
              {" "}
              <Header title="Messages" component={<Messages />} />
            </Route>
            <Route path="/message/:contact">
              {" "}
              <Header title="Conversation" component={<SingleConversation />} />
            </Route>
            <Route path="/checkout/:packageNum">
              {" "}
              <Header title="Checkout" component={<Checkout />} />
            </Route>
            <Route path="/servers">
              {" "}
              <Header title="Servers" component={<Servers />} />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
