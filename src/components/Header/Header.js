import React, { useContext } from "react";
import firebase from "../../../firebase";
import { withRouter, Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
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
import HomeOutlined from "@material-ui/icons/HomeOutlined";
import TodayIcon from "@material-ui/icons/Today";
import SettingsIcon from "@material-ui/icons/Settings";
import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";
import PublicIcon from "@material-ui/icons/Public";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import StorageIcon from "@material-ui/icons/Storage";
import AccountIcon from "./AccountIcon";
import { Button } from "@material-ui/core";

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
    background: "linear-gradient(to right, #4b6cb7, #182848)",
    textAlign: "right",
    padding: "10px",
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
  active: {
    backgroundColor: "primary !important",
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
    padding: theme.spacing(0, 0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
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
    width: "100%",
  },
  selected: {
    "&.Mui-selected": {
      backgroundColor: "lightblue !important",
      color: "white",
      fontWeight: 600,
    },
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
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
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
          <div className="title">
            <Typography variant="h6" noWrap style={{ width: "70%" }}>
              <h3>{props.title}</h3>
            </Typography>{" "}
          </div>
          <Typography style={{ textAlign: "right" }}>
            {" "}
            <div className={classes.userInfo}>
              {user ? (
                <>
                  <AccountIcon user={user} LogoutUser={LogoutUser} />{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Link to={"/checkout/1"} style={{ color: "white" }}>
                    <button type="button" className="btn btn-warning">
                      Get Started
                    </button>{" "}
                  </Link>
                  <Link to={"/login"}>
                    <Button variant="contained" color="primary">
                      Login
                    </Button>
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
              name: "Servers",
              link: "/servers",
              icon: <StorageIcon />,
            },
            {
              name: "Billing",
              link: "/billing",
              icon: <AccountBalanceIcon />,
            },
            {
              name: "Settings",
              link: "/settings",
              icon: <SettingsIcon />,
            },
          ].map((item, index) => (
            <div key={index}>
              <Link to={item.link} style={{ textDecoration: "none" }}>
                <ListItem
                  button
                  key={item.name}
                  selected={selectedIndex === index}
                  onClick={(event) => handleListItemClick(event, index)}
                  classes={{ selected: classes.selected }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </Link>
            </div>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {props.component}
      </main>
    </div>
  );
};

export default withRouter(Header);
