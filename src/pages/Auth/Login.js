import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import validateLogin from "../../validators/validateLogin";
import useForm from "../../hooks/useForm";
import firebase from "../../firebase";

const INITIAL_STATE = {
  email: "",
  password: "",
};

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

      console.log("You are now logged in!");
      console.log(props);
      props.history.push("/home");
    } catch (err) {
      console.error("authentication error", err);
      console.log(err.message);
    }
    setBusy(false);
  }

  return (
    <div className="login" style={{ textAlign: "center" }}>
      <h1 style={{ paddingTop: "10px", textAlign: "center" }}>
        QR Store Login
      </h1>

      <form lines="full">
        <label position="floating">Email</label>
        <input
          name="email"
          type="text"
          required
          value={values.email}
          onChange={handleChange}
        ></input>

        <label position="floating">Password</label>
        <input
          name="password"
          type="password"
          required
          value={values.password}
          onChange={handleChange}
        ></input>
      </form>
      <button
        type="submit"
        color="primary"
        expand="block"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        Log In
      </button>

      <Link to={"/forgot"}>Forgot Password?</Link>
    </div>
  );
};

export default withRouter(Login);
