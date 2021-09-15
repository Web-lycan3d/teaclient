/** @format */

import React, { Fragment } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CheckoutItem from "../checkout-item/checkoutItem.comonnent";
import AnimatedNumber from "react-animated-number";

import {
  selectCartItem,
  selectCartItemTotal,
} from "../../redux/cart/cart.selector";
import "./checkoutContainer.styles.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LottieAnimation from "../lottie/LottieAnimation";

const CheckoutContainer = ({ cartitems, total }) => {
  const GrandTotal = total * 1.18 + 50;
  return (
    <Fragment>
      <div className="checkout-page">
        <div className="checkout-header">
          <div className="header-block">Product</div>
          <div className="header-block">Description</div>
          <div className="header-block">Quantity</div>
          <div className="header-block">Price</div>
          <div className="header-block">Remove</div>
        </div>
        <motion.div layout className="cart-items-page">
          {cartitems.length ? (
            cartitems.map((cartitem) => (
              <CheckoutItem key={cartitem.id} cartitem={cartitem} />
            ))
          ) : (
            <>
              <div className="empty-cart">
                <LottieAnimation w={250} h={100} />

                <span>No items Found</span>
                <Link to="/tea">
                  <button>Add Now</button>
                </Link>
              </div>
            </>
          )}
        </motion.div>
        {total !== 0 && (
          <div className="inclusive">
            <p>Total = ₹{total}</p>
            <span>18% GST</span>
            <span>Fixed Delivery Charges ₹50</span>
          </div>
        )}
        {total !== 0 && (
          <div className="total">
            <span>
              Grand Total:₹
              <AnimatedNumber
                component="text"
                value={GrandTotal}
                style={{
                  transition: "2s ease-in-out",

                  transitionProperty: "background-color, color, opacity",
                }}
                stepPrecision={Math.round(0.1)}
                frameStyle={(perc) =>
                  perc === 100 ? {} : { color: "#39c670" }
                }
                duration={1500}
              />
            </span>
          </div>
        )}
        {total !== 0 && (
          <div className="checkout-redirect">
            <Link to="/checkout">
              <button> Proceed to checkout</button>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  cartitems: selectCartItem,
  total: selectCartItemTotal,
});

export default connect(mapStateToProps)(CheckoutContainer);
