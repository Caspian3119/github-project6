import React, { useState, useRef } from "react";
import Pin from "@mui/icons-material/LocationOn";
import "./login.css";
import axios from "axios";
import google from "./image/google.png";
import twitter from "./image/twitter.png";
import facebook from "./image/facebook.png";

const Login = ({
  setShowLogin,
  localStorage,
  setCurrentUser,
  setShowRegister,
}) => {
  const [failed, setFailed] = useState(false);
  const name = useRef();
  const password = useRef();

  const showRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const User = {
      username: name.current.value,
      password: password.current.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/login",
        User
      );
      localStorage.setItem("user", res.data.username);
      setCurrentUser(res.data.username);
      setShowLogin(false);
      setFailed(false);
    } catch (err) {
      setFailed(err);
    }
  };

  return (
    <div className="container">
      <div className="logContainer">
        <div className="logo">
          <Pin />
          <p className="title">Pin-N-Rate</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" placeholder="username" ref={name}></input>
          <label>Password</label>
          <input type="password" placeholder="password" ref={password}></input>
          <button className="logButton">Login</button>
          {failed && <span className="fail">Wrong Username or password</span>}
        </form>
        <span>
          Don't Have an Account?{" "}
          <a href="#" onClick={() => setShowLogin(showRegister)}>
            Register Now
          </a>
        </span>
        <span>OR</span>
        <ul>
          <li>
            <a href="https://google.com">
              <img className="icons" src={google} alt="google image" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com">
              <img className="icons" src={twitter} alt="google image" />
            </a>
          </li>
          <li>
            <a href="https://facebook.com">
              <img className="icons" src={facebook} alt="google image" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
