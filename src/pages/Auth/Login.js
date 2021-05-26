import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import validateLogin from "../../validators/validateLogin";
import useForm from "../../hooks/useForm";
import firebase from "../../firebase";
import { Button, TextField, Card, CardContent } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";
import "../../css/Login.css";

const INITIAL_STATE = {
  email: "",
  password: "",
};

//!TODO clean up form with material-ui
const Login = (props) => {
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateLogin,
    authenticateUser
  );

  const [busy, setBusy] = useState(false);

  async function authenticateUser() {
    setBusy(true);
    const { email, password } = values;

    try {
      await firebase.login(email, password);
      toast.success("You are now logged in!");
      props.history.push("/dashboard");
    } catch (err) {
      toast.error("Unable to login. Please check username/password.");
    }
    setBusy(false);
  }

  return (
    <div className="login" style={{ textAlign: "center" }}>
      <Card>
        <CardContent>
          <h1 style={{ paddingTop: "10px", textAlign: "center" }}>
            Marketing Platform Login
          </h1>
          <br />
          <form lines="full">
            <TextField
              name="email"
              variant="outlined"
              type="text"
              label="Email"
              fullWidth
              required
              value={values.email}
              onChange={handleChange}
            />
            <br />
            <br />
            <TextField
              name="password"
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              required
              value={values.password}
              onChange={handleChange}
            />
          </form>
          <br />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            expand="block"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Log In
          </Button>
          <br />
          <Link to={"/forgot"}>Forgot Password?</Link>
        </CardContent>
      </Card>

      <ToastContainer />
    </div>
  );
};

export default withRouter(Login);
