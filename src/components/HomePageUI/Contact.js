import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  Grid,
} from "@material-ui/core";

const Contact = () => {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    setContactDetails((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div id="contact" style={{ padding: "20px" }}>
      <h3 style={{ paddingBottom: "20px" }}>Contact Us</h3>
      <Card style={{ width: "75%", margin: "auto", padding: "30px" }}>
        <CardContent>
          <Grid container spacing={2} align="center">
            <Grid item xs={12}>
              <TextField
                name="name"
                type="text"
                label="Name"
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                type="text"
                label="Email"
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="message"
                label="Message"
                onChange={handleChange}
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                rowsMax={6}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
