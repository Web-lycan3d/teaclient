/** @format */

import React from "react";
import { connect } from "react-redux";

import "./checkoutItem.styles.scss";
import {
  clearItemFromCart,
  addItemtoCart,
  removeItemFromCart,
} from "../../redux/cart/cart.action";
import { Link } from "react-router-dom";
const CheckoutItem = ({
  cartitem,
  clearItemFromCart,
  removeItemFromCart,
  addItemtoCart,
}) => {
  const { name, price, quantity, imageURL, id, productId } = cartitem;
  return (
    <div layout className="checkout-item">
      <div className="image-container">
        {parseInt(id) <= 10 ? (
          <Link to={"/single/product/" + id + "?productId=" + productId}>
            <img src={imageURL} alt="error" />
          </Link>
        ) : (
          <Link to={"/single/product/" + id}>
            <img src={imageURL} alt="error" />
          </Link>
        )}
      </div>
      <span className="name">
        {parseInt(id) <= 10 ? (
          <Link to={"/single/product/" + id + "?productId=" + productId}>
            {name}
          </Link>
        ) : (
          <Link to={"/single/product/" + id}>{name}</Link>
        )}
      </span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItemFromCart(cartitem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItemtoCart(cartitem)}>
          &#10095;
        </div>
      </span>
      <span className="price">INR ₹{price}</span>
      <div
        className="remove-button"
        onClick={() => clearItemFromCart(cartitem)}>
        &#10005;
      </div>
    </div>
  );
};

export default connect(null, {
  clearItemFromCart,
  addItemtoCart,
  removeItemFromCart,
})(CheckoutItem);
