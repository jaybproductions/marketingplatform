import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import useForm from "../../hooks/useForm";
import validatePasswordReset from "../../validators/validatePasswordReset";
import firebase from "../../firebase";

const INITIAL_STATE = {
  email: "",
};

//!TODO clean up form with material-ui
const Forgot = (props) => {
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validatePasswordReset,
    handleResetPassword
  );

  const [busy, setBusy] = useState(false);

  async function handleResetPassword() {
    setBusy(true);
    const { email } = values;

    try {
      await firebase.resetPassword(email);
      console.log("Check your email to reset password");
    } catch (err) {
      console.log("Password reset error", err);
      console.log("Unable to reset password. Please try again.");
    }
    setBusy(false);
  }

  return (
    <div
      className="forgot"
      style={{ display: "grid", placeItems: "center", paddingTop: "50px" }}
    >
      <h1>Forgot Password</h1>

      <form lines="full">
        <TextField
          name="email"
          label="Email"
          type="text"
          required
          value={values.email}
          onChange={handleChange}
        />
        <div style={{ paddingTop: "20px" }} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          expand="block"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Get Reset Link
        </Button>
      </form>
    </div>
  );
};

export default Forgot;
