import React, { useState } from "react";

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
    <div className="forgot">
      <h1 style={{ paddingTop: "10px" }}>BT Console Forgot Password</h1>

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

      <button
        type="submit"
        color="primary"
        expand="block"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        Get Reset Link
      </button>
    </div>
  );
};

export default Forgot;
