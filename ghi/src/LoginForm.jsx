import { useState, useEffect } from "react";
import { useLoginMutation } from "./app/apiSlice";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
    const [login, loginResult] = useLoginMutation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      if (loginResult.isSuccess) navigate("/");
    }, [loginResult, navigate]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      login({ username, password });
    };
    const cancelButton = () => {
      navigate(`/`);
    };
  
    return (
      <div className="container">
      <div className="row">
          <div className='background-accent shadow-lg'></div>
          <div className='background-accent-2 shadow-lg'></div>
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} id="signup-form">
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
              <button className="btn-transition-sm gradient" type="Submit">
                Login
              </button>
              <button className="btn-transition-sm gradient" onClick={cancelButton}>
                Cancel
              </button>
              <div className="my-2 d-flex flex-column align-items-center">
                <Link
                  to="/signup"
                  style={{ textDecoration: "underline", color: "blue" }}
                >
                  Don't have an account yet? click here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default LoginForm;
  