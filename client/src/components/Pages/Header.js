import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/app/AppContext";
import { AuthContext } from "../../context/auth/AuthContext";
import { Link } from "react-router-dom";

function Header() {
  const { cart } = useContext(AppContext);
  const { isAuthenticated, user, logout, loadUser, token } =
    useContext(AuthContext);

  useEffect(() => {
    token && loadUser();
    console.log("AM FROM HEADER 123:", isAuthenticated, user);
  }, [isAuthenticated]);

  return (
    <header className="main-head head-container">
      <figure className="genie-image">
        {" "}
        <img src="/images/genie-2.png" alt="Genie" />{" "}
      </figure>
      <figcaption className="app-name">Genie</figcaption>
      <figcaption className="caption">JUST A CLICK AWAY!</figcaption>
      {isAuthenticated && (
        <aside>
          <p className="links-one"> Welcome {user && user.username} </p>
          <Link to="/" onClick={logout} className="link-style">
            <span className="links-two">Logout</span>
          </Link>

          {cart.length ? (
            <figure>
              (
              <img
                className="cart-image"
                src="/images/cart-5.jpeg"
                alt="Kart"
              />
              <figcaption className="cart-counter">{cart.length}</figcaption>)
            </figure>
          ) : (
            ""
          )}
        </aside>
      )}
    </header>
  );
}

export default Header;
