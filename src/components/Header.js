import React, { useContext } from "react";
import firebase from "../firebase";
import { withRouter, Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import HomeOutlined from "@material-ui/icons/HomeOutlined";
import TodayIcon from "@material-ui/icons/Today";
import SettingsIcon from "@material-ui/icons/Settings";
import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";
import PublicIcon from "@material-ui/icons/Public";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    textAlign: "right",
    padding: "20px",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  userInfo: {
    textAlign: "right",
  },
}));

const Header = (props) => {
  const { user } = useContext(UserContext);
  async function LogoutUser() {
    try {
      await firebase.logout();
      props.history.push("/login");
      console.log("You are now logged out.");
    } catch (err) {
      console.error("Unable to log out", err);
      console.log(err.message);
    }
  }

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="header">
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ width: "90%" }}>
            <div className="title">
              <Link to={"/home"} style={{ color: "white" }}>
                <h3>Marketing Platform</h3>
              </Link>
            </div>
          </Typography>
          <Typography style={{ textAlign: "right" }}>
            {" "}
            <div className={classes.userInfo}>
              {user ? (
                <>
                  <p>Hello, {user.displayName}</p>
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={LogoutUser}
                  >
                    Logout
                  </button>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Link to={"/login"}>
                    <button type="button" className="btn btn-dark">
                      Login
                    </button>{" "}
                  </Link>
                  <Link to={"/signup"}>
                    <button type="button" className="btn btn-dark">
                      Sign Up
                    </button>{" "}
                  </Link>
                </>
              )}
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            { name: "Home", link: "/home", icon: <HomeOutlined /> },
            {
              name: "Your Websites",
              link: "/websites",
              icon: <PublicIcon />,
            },
            {
              name: "Social Calendar",
              link: "/2/client/3",
              icon: <TodayIcon />,
            },
            {
              name: "Messages",
              link: "/messages",
              icon: <ChatBubbleOutline />,
            },
            {
              name: "Settings",
              link: "/settings",
              icon: <SettingsIcon />,
            },
          ].map((item, index) => (
            <Link
              to={item.link}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button key={item.name}>
                <ListItemIcon>{item.icon}</ListItemIcon>

                <ListItemText primary={item.name} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.component}
      </main>
    </div>
  );
};

export default withRouter(Header);
