/** @format */

import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ReactComponent as Logo } from "../svg/Mybox_Logo.svg";
import { logoutUser } from "../../redux/user/user.actions";

import "./UserNav.styles.scss";

const UserNav = ({ logoutUser }) => {
  return (
    <Fragment>
      <div className="white-space"></div>
      <div className="header">
        <Link to="/profile" className="logo-container">
          <Logo className="logo" />
        </Link>
        <div className="options">
          <Link to="/myorders" className="option">
            My Orders
          </Link>
          <Link to="/cart" className="option">
            Cart
          </Link>
          <Link onClick={logoutUser} to="#!" className="option">
            Logout
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, { logoutUser })(UserNav);
