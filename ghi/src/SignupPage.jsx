import { useState } from "react";
import { useSignupMutation, useCreateUserInventoryMutation } from "./app/apiSlice";
import { useNavigate, Link } from "react-router-dom";
import { create } from "@reduxjs/toolkit";

const SignupPage = () => {
  const [signup] = useSignupMutation();
  const [CreateUserInventory] = useCreateUserInventoryMutation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConf) {
      return alert("Passwords do not match");
    } else {
      try {
        await signup({ email, username, password }).unwrap();
        await CreateUserInventory({ name: "inventory" });
        setTimeout(() => {
          navigate("/");
        }, 50);
      } catch (error) {
        switch (error.status) {
          case 400:
            alert("Cannot create an account with those credentials");
            break;
          default:
            navigate("/");
        }
      }
    }
  };

  const cancelButton = () => {
    navigate(`/`);
  };

  return (
    <div className="container">
    <div className="row">
      <div className="offset-3 col-6">
        <div className='background-accent shadow-lg'></div>
        <div className='background-accent-2 shadow-lg'></div>
        <div className="shadow p-4 mt-4">
          <h1>Signup</h1>
          <form onSubmit={handleSubmit} id="signup-form">
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="email@example.com"
                required
                type="text"
                name="email"
                id="email"
                className="form-control"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Username"
                required
                type="text"
                name="username"
                id="username"
                className="form-control"
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                required
                type="password"
                name="password"
                id="password"
                className="form-control"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setPasswordConf(e.target.value)}
                value={passwordConf}
                placeholder="Password"
                required
                type="password"
                name="password"
                id="password"
                className="form-control"
              />
              <label htmlFor="password">Confirm Password</label>
            </div>
            <button className="btn-transition-sm gradient" type="Submit">
              Create Account
            </button>
            <button
              className="btn-transition-sm gradient"
              onClick={() => cancelButton()}
            >
              Cancel
            </button>
            <div className="my-2 d-flex flex-column align-items-center">
              <Link
                to="/login"
                style={{ textDecoration: "underline", color: "blue" }}
              >
                already have an account? click here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
</div>
  );
};

export default SignupPage;
