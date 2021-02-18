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
import PersonIcon from "@material-ui/icons/Person";

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

export default function SocialTable() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const itemArr = [
    {
      title: "Add all content into one calendar.",
      descr:
        "Keep an unlimted number of posts and accounts inside of this calendar",
    },
    {
      title: "Easy Copy/Paste Posting",
      descr: "1. Open the post. 2. Copy Content. 3. Post Away!",
    },
    {
      title: "No need to connect any accounts directly.",
      descr:
        "Keep all content on the site without needing to connect your accounts (Your privacy is important.).",
    },
    {
      title: "Constant Updates",
      descr:
        "Updates are made regularly to make an even better expierence for you.",
    },
    {
      title: "Did we mention? It's completely Free to use",
      descr:
        "As long as you have an active hosting account you are free to use this feature as much or as little as you'd like.",
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
                        <PersonIcon />
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
