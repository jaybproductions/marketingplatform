import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import PublicIcon from "@material-ui/icons/Public";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export default function HostingTable() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const itemArr = [
    {
      title: "Flexible Pricing",
      descr: "Super competitive pricing for as low as 10/m",
    },
    {
      title: "Scalable",
      descr: "Increase Storage/Bandwidth at the click of a button.",
    },
    { title: "SSL Included", descr: "Free SSL is included for every site!" },
    {
      title: "Single or Multisite",
      descr: "Need multiple sites under one network? We got you covered.",
    },
    {
      title: "Amazon Lightsail",
      descr:
        "Take advantage of Amazon's massive infastructure with reliable uptime and fast speeds.",
    },
  ];
  const [listArr, setListArr] = React.useState(itemArr);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Features
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              {listArr.map((item, index) => (
                <>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PublicIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.title}
                      secondary={secondary ? "Secondary text" : item.descr}
                    />
                  </ListItem>
                </>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
