import React, { useContext, useState } from "react";
import useForm from "../../hooks/useForm";
import firebase from "../../firebase";
import validateSignup from "../../validators/validateSignup";
import UserContext from "../../contexts/UserContext";

const INITIAL_STATE = {
  name: "",
  url: "",
  image: null,
  email: "",
  password: "",
  photoURL: "",
  claims: {
    isAdmin: false,
    clientid: "100",
  },
};

//!TODO clean up form with material-ui
const Signup = (props) => {
  const { user } = useContext(UserContext);
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateSignup,
    authenticateUser
  );

  const [busy, setBusy] = useState(false);

  async function authenticateUser() {
    setBusy(true);
    const { name, email, password, photoURL, claims } = values;

    try {
      await firebase.register(name, email, password, photoURL, claims);
      console.log("You have signed up succsessfully!");
      props.history.push("/home");
    } catch (err) {
      console.log(err.message);
    }
    setBusy(false);
  }

  return (
    <div className="signup">
      <h1 style={{ paddingTop: "10px" }}>QR Store Login</h1>

      <form lines="full">
        <label position="floating">Username</label>
        <input
          name="name"
          type="text"
          required
          value={values.name}
          onChange={handleChange}
        ></input>
      </form>
      <form lines="full">
        <label position="floating">Email</label>
        <input
          name="email"
          type="text"
          required
          value={values.email}
          onChange={handleChange}
        ></input>
      </form>
      <form lines="full">
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
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
