import React, { useState, useEffect } from "react";
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
import Dashboard from "./pages/Dashboard";

//Context Imports
import UserContext from "./contexts/UserContext";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import Billing from "./pages/Billing";
import SingleConversation from "./pages/SingleConversation";
import Checkout from "./pages/Checkout";
import Servers from "./pages/Servers";
import firebase from "./firebase";

import { CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactLoading from "react-loading";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function App(props) {
  const history = useHistory();
  const [user, setUser] = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  const handleLogout = () => {
    firebase.logout();
    history.push("/login");
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Switch>
        {user ? (
          <>
            <div className="content">
              {isLoading ? (
                <div
                  className="loading"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    paddingRight: "100px",
                  }}
                >
                  <ReactLoading type="bars" color="white" />
                  <br />
                </div>
              ) : (
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
                        <SideNav.Nav defaultSelected="dashboard">
                          <NavItem eventKey="dashboard">
                            <NavIcon>
                              <ion-icon name="home-outline"></ion-icon>
                            </NavIcon>
                            <NavText>Dashboard</NavText>
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

                          <NavItem eventKey="servers">
                            <NavIcon>
                              <ion-icon name="server-outline"></ion-icon>
                            </NavIcon>
                            <NavText>Servers</NavText>
                          </NavItem>

                          <NavItem eventKey="billing">
                            <NavIcon>
                              <ion-icon name="wallet-outline"></ion-icon>
                            </NavIcon>
                            <NavText>Billing</NavText>
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
                            <NavItem eventKey="login" onSelect={handleLogout}>
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
                        <Route
                          path="/dashboard"
                          component={(props) => <Dashboard />}
                        />
                        <Route
                          path="/social"
                          component={(props) => <SocialPage />}
                        />

                        <Route
                          path="/settings"
                          component={(props) => <Settings />}
                        />
                        <Route
                          path="/signup"
                          component={(props) => <Signup />}
                        />
                        <Route
                          path="/forgot"
                          component={(props) => <Forgot />}
                        />
                        <Route
                          path="/billing"
                          component={(props) => <Billing />}
                        />
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
                        <Route
                          path="/servers"
                          component={(props) => <Servers />}
                        />
                      </main>
                    </React.Fragment>
                  )}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <Route path="/" exact component={(props) => <Home />} />
            <Route path="/home" component={(props) => <Home />} />
            <Route path="/login" component={(props) => <Login />} />
            <Route path="/forgot" component={(props) => <Forgot />} />
            <Route
              path="/checkout/:packageNum"
              component={(props) => <Checkout />}
            />
          </>
        )}
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
