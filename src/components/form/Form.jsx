import React, { useState } from "react";
import "./form.css";
const Form = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h3>
      <h5 style={{ margin: "10px" }}>Username</h5>
      <div className="topnav__search form-input">
        <input
          type="email"
          placeholder="Enter your username or Email"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "20px" }}></div>
      <h5 style={{ margin: "10px" }}>Password</h5>
      <div className="topnav__search form-input">
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-button">
        <button
          type="button"
          onClick={() => props.handleClick(username, password)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;
