/** @format */

import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import CartIcon from "../cart-icon/cart-icon.component";
import { ReactComponent as Logo } from "../svg/Tea_In_Box.svg";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import "./navbar.styles.scss";
import { Badge } from "@material-ui/core";

const Navbar = ({ user: { isAuthenticated, loading }, hidden }) => {
  const location = useLocation();
  const [cartItems, setCartitems] = useState([]);
  const cart = useSelector((data) => data);
  const [Navbar, setNavbar] = useState(false);

  useEffect(() => {
    if (cart.user?.token)
      cart.cart?.cartitems && setCartitems(cart.cart?.cartitems);
  }, [cart]);

  useEffect(() => {
    setNavbar(false);
  }, [location]);

  return (
    <>
      <div className="nav">
        {!Navbar && (
          <Badge
            badgeContent={cartItems?.length}
            color="secondary"
            className="badge"
          />
        )}
        <div
          className={
            Navbar ? "nav-mobile-icon nav-mobile-active" : "nav-mobile-icon"
          }
          onClick={() => setNavbar(!Navbar)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Link to="/" className="logo-container">
          <Logo className="logo" />
        </Link>
        <div className={Navbar ? "options option-active" : "options"}>
          {/* <Link to="/looseleaf" className="option">
            Loose Leaf
          </Link> */}
          {/* <Link to="/teabags" className="option">
            Teabags
          </Link> */}
          <Link to="/tea" className="option">
            Tea
          </Link>
          {!loading && isAuthenticated ? (
            <Fragment>
              <Link to="/profile" className="option">
                My Tea Box
              </Link>
              <CartIcon />
            </Fragment>
          ) : (
            <Link to="/login" className="option">
              Login
            </Link>
          )}
        </div>
        {hidden ? null : <CartDropdown />}
      </div>
    </>
  );
};

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  hidden: state.cart.hidden,
});

export default connect(mapStateToProps)(Navbar);
