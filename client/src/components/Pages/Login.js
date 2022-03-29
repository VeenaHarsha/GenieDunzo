import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { Link, Redirect } from "react-router-dom";

function Login() {
  const { token, login, error, isAuthenticated } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    token && isAuthenticated && setIsLogin(true);
  }, [isAuthenticated]);

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const loginTrello = async (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
    setIsLogin(true);
    setUser({
      email: "",
      password: "",
    });
  };

  return isLogin && isAuthenticated ? (
    <Redirect to="/home" />
  ) : (
    <main className="login-container">
      <form className="user-login-form" onSubmit={loginTrello}>
        {error && <p className="login-error">{error.message}</p>}
        <summary className="login-text"> Login Please 123!</summary>
        <input
          type="email"
          className="login-input"
          placeholder="Enter Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          autoComplete="new-password"
          className="login-input"
          placeholder="Enter Password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <footer className="footer-text">
        Don't have an account.{" "}
        <Link to="/register" className="link-style">
          Register New User
        </Link>
      </footer>
    </main>
  );
}
export default Login;
