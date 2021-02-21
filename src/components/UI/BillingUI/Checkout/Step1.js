import React from "react";

const Step1 = ({ name, setName, email, setEmail, password, setPassword }) => {
  return (
    <div className="step-1">
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Re-enter Password:
          <input
            type="password"
            autoComplete={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
};

export default Step1;
