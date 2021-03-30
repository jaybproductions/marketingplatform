import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

//Route Imports
import Home from "./pages/Home";
import useAuth from "./hooks/useAuth";
import SocialPage from "./pages/Social";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Forgot from "./pages/Auth/Forgot";

//Context Imports
import UserContext from "./contexts/UserContext";
import Settings from "./pages/Settings";
import Websites from "./pages/Websites";
import Messages from "./pages/Messages";
import Billing from "./pages/Billing";
import SingleConversation from "./pages/SingleConversation";
import Checkout from "./pages/Checkout";
import Servers from "./pages/Servers";
import firebase from "./firebase";

function App() {
  const [user, setUser] = useAuth();

  const handleLogout = () => {
    firebase.logout();
  };
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <div
          className="content"
          style={{ paddingTop: "50px", margin: "auto", marginLeft: "200px" }}
        >
          <Switch>
            <Route
              render={({ location, history }) => (
                <React.Fragment>
                  <SideNav
                    onSelect={(selected) => {
                      const to = "/" + selected;
                      if (location.pathname !== to) {
                        history.push(to);
                      }
                    }}
                  >
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="home">
                      <NavItem eventKey="home">
                        <NavIcon>
                          <ion-icon name="home-outline"></ion-icon>
                        </NavIcon>
                        <NavText>Home</NavText>
                      </NavItem>
                      <NavItem eventKey="messages">
                        <NavIcon>
                          <ion-icon name="chatbubbles-outline"></ion-icon>
                        </NavIcon>
                        <NavText>Messages</NavText>
                      </NavItem>
                      <NavItem eventKey="social">
                        <NavIcon>
                          <ion-icon name="calendar-outline"></ion-icon>
                        </NavIcon>
                        <NavText>Social</NavText>
                      </NavItem>
                      <NavItem eventKey="websites">
                        <NavIcon>
                          <ion-icon name="globe-outline"></ion-icon>
                        </NavIcon>
                        <NavText>Websites</NavText>
                      </NavItem>
                      <NavItem eventKey="settings">
                        <NavIcon>
                          <ion-icon name="cog-outline"></ion-icon>
                        </NavIcon>
                        <NavText>Settings</NavText>
                      </NavItem>
                      {!user && (
                        <NavItem eventKey="login">
                          <NavIcon>
                            <ion-icon name="person-outline"></ion-icon>
                          </NavIcon>
                          <NavText>Login</NavText>
                        </NavItem>
                      )}
                      {user && (
                        <NavItem eventKey="logout" onSelect={handleLogout}>
                          <NavIcon>
                            <ion-icon name="log-out-outline"></ion-icon>
                          </NavIcon>
                          <NavText>Logout</NavText>
                        </NavItem>
                      )}
                    </SideNav.Nav>
                  </SideNav>
                  <main>
                    <Route path="/" exact component={(props) => <Home />} />
                    <Route path="/home" component={(props) => <Home />} />
                    <Route
                      path="/social"
                      component={(props) => <SocialPage />}
                    />
                    <Route
                      path="/websites"
                      component={(props) => <Websites />}
                    />
                    <Route
                      path="/settings"
                      component={(props) => <Settings />}
                    />
                    <Route path="/signup" component={(props) => <Signup />} />
                    <Route path="/forgot" component={(props) => <Forgot />} />
                    <Route path="/billing" component={(props) => <Billing />} />
                    <Route
                      path="/messages"
                      component={(props) => <Messages />}
                    />
                    <Route
                      path="/message/:contact"
                      component={(props) => <SingleConversation />}
                    />
                    <Route
                      path="/checkout/:packageNum"
                      component={(props) => <Checkout />}
                    />
                    <Route path="/servers" component={(props) => <Servers />} />
                    {!user && (
                      <Route path="/login" component={(props) => <Login />} />
                    )}
                  </main>
                </React.Fragment>
              )}
            />
          </Switch>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
