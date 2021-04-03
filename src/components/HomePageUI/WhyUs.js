import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Paper } from "@material-ui/core";
import HostingTable from "./HostingTable";
import SocialTable from "./SocialTable";
import MessagingTable from "./MessagingTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: "auto",

    backgroundColor: theme.palette.background.paper,
  },
}));

export default function WhyUs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div
        id="why-heading"
        style={{
          paddingBottom: "50px",
          paddingTop: "25px",
        }}
      >
        <Typography variant="h4" component="h4">
          Why us?
        </Typography>
      </div>
      <div
        className="why-us"
        id="why-us"
        style={{ backgroundColor: "black", padding: "20px", width: "100%" }}
      >
        <div className="container">
          <Paper>
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="features"
                  centered
                  style={{ backgroundColor: "black" }}
                >
                  <Tab label="Hosting" {...a11yProps(0)} />
                  <Tab label="Social Media" {...a11yProps(1)} />
                  <Tab label="Messaging" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <HostingTable />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <SocialTable />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <MessagingTable />
              </TabPanel>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}
