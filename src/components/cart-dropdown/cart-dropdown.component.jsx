/** @format */

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import CartDropdownItem from "../cart-dropdown-item/CartDropdownItem.component";

import { selectCartItem } from "../../redux/cart/cart.selector";
import { togglecartHidden } from "../../redux/cart/cart.action";
import "./cart-dropdown.styles.scss";
import { BiCart } from "react-icons/bi";
import LottieAnimation from "../lottie/LottieAnimation";

const CartDropdown = ({ cartitems, history, dispatch }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartitems.length ? (
          cartitems.map((cartItem) => (
            <CartDropdownItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <>
            <span className="empty-message">Your cart is empty</span>
            <LottieAnimation w={200} h={110} />
          </>
        )}
      </div>
      {cartitems.length ? (
        <button
          onClick={() => {
            history.push("/cart");
            dispatch(togglecartHidden());
          }}>
          Go to cart <BiCart className="cart-icon-dropdown" />
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartitems: selectCartItem,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
