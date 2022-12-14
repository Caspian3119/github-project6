import React, { useState, useRef } from "react";
import Pin from "@mui/icons-material/LocationOn";
import "./register.css";
import axios from "axios";

const Register = ({ setShowRegister, setShowLogin }) => {
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  const userRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  const showForm = () => {
    setShowRegister(false);
    setShowLogin(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    if (
      newUser.username === "" &&
      newUser.username.length < 5 &&
      newUser.username.match(userRegex)
    ) {
      alert("Please Input a username");
    } else if (newUser.username.length < 5) {
      alert("Please make username longer than 5 letters");
    } else if (newUser.username.match(userRegex)) {
      alert("No special characters in your username");
    } else if (!newUser.email.match(emailRegex)) {
      alert("Invalid email address");
    } else if (newUser.password === "") {
      alert("Please Input a password");
    } else if (newUser.password.length < 6) {
      alert("Please make your password longer");
    } else {
      try {
        axios.post("https://project-6-back-end.herokuapp.com/api/users/register", newUser);
        setSuccess(true);
        setFailed(false);
      } catch (err) {
        setFailed(err);
      }
    }
  };
  return (
    <div className="container">
      <div className="regContainer">
        <div className="logo">
          <Pin />
          <p className="title">Pin-N-Rate</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" placeholder="username" ref={name}></input>
          <label>Email</label>
          <input type="email" placeholder="email" ref={email}></input>
          <label>Password</label>
          <input type="password" placeholder="password" ref={password}></input>
          <button className="regButton">Register</button>
          {success && (
            <div className="successMsg">
              <span className="success">Account Successfully Created</span>
              <br />
              <button
                className="regButton"
                onClick={() => setShowRegister(showForm)}
              >
                Back to login
              </button>
            </div>
          )}
          {failed && <span className="fail">Something went wrong</span>}
        </form>
      </div>
    </div>
  );
};

export default Register;
