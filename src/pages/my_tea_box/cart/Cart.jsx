/** @format */

import React, { Fragment } from "react";
import UserNav from "../../../components/User_Navbar/UserNav.component";
import CheckoutContainer from "../../../components/checkout-container/checkoutContainer.component";
import "./cart.styles.scss";

const Cart = () => {
  return (
    <Fragment>
      <UserNav />
      <div className="cart-container">
        <div className="cart-contents">
          <h2>My Cart</h2>
          <div className="">
            <CheckoutContainer />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
