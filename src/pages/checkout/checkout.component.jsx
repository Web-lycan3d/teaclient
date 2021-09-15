/** @format */

import React, { Fragment, useEffect, useState } from "react";
import convertor from "number-to-words";

import "./checkout.styles.scss";

import { selectCartItemTotal } from "../../redux/cart/cart.selector";
import { createStructuredSelector } from "reselect";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import api from "../../apiUrl/api";
import OrderDone from "../../components/lottie/OrderDone";
import { motion } from "framer-motion";
import OrderError from "../../components/lottie/OrderError";

function loadScript() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}
const backendUrl = api();

const Checkout = ({ total }) => {
  const GrandTotal = total * 1.18 + 50;
  const [userDetails, setUserDetails] = useState("");
  const [userAddress, setUserAddress] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    city: "",
    address: "",
    pincode: "",
  });

  const [mobileError, setMobileError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [pinError, setPinError] = useState(null);
  const [cartData, setCartData] = useState([]);

  const cartDetails = useSelector((state) => state?.cart);
  const userData = useSelector((state) => state?.user.user);

  useEffect(() => {
    window.scrollTo(0, 0);
    userData && setUserDetails(userData);
    cartDetails && setCartData(cartDetails.cartitems);
  }, [userData, cartDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const picodeRegex = new RegExp("^[1-9][0-9]{5}$");
    const verifyPin = picodeRegex.test(userAddress.pincode);

    const exp = validator.isMobilePhone(userAddress.phoneNumber, ["en-IN"]);
    // checkingaddressLength

    if (exp) {
      setMobileError(false);
      if (userAddress.address.length < 10) {
        setAddressError(true);
      } else {
        setAddressError(false);
        if (!verifyPin) {
          setPinError(true);
        } else {
          setPinError(false);

          userAddress.username = userData?.username;
          userAddress.email = userData?.email;

          handleRazorPay();
        }
        // checkingvalidNumber
      }
    } else {
      setMobileError(true);
    }
  };

  const handleRazorPay = async () => {
    // creatingScritTag
    const res = await loadScript();
    //give an alert
    if (!res) {
      return console.log("error");
    }
    const { data } = await axios.post(backendUrl + "/api/razorpay", {
      userAddress,
      total: GrandTotal,
    });

    const options = {
      key: "rzp_live_nce88IhegilKjE",
      amount: "20000",
      currency: "INR",
      name: "TeaInBox",
      description: "Drink Something New",
      image: "https://i.ibb.co/YBDh2Pv/Group-4445.png",
      order_id: data.id,
      handler: async function (response) {
        const paymentId = response.razorpay_signature;
        const resp = await axios.post(
          backendUrl + "/api/razorpay/capture/" + paymentId,
          { data, paymentId: response.razorpay_payment_id }
        );
        if (resp) {
          if (resp.data.payment) {
            setPaymentStatus(true);
            setPaymentError(false);
            await axios.post(backendUrl + "/api/order", {
              userOrder: cartData,
              userData: userAddress,
              total: GrandTotal,
            });
          } else {
            setPaymentStatus(false);
            setPaymentError(true);
          }
        }
      },
      prefill: {
        name: userDetails?.username,
        email: userDetails?.email,
        contact: userAddress?.phoneNumber,
      },
      notes: {
        address: userAddress?.address,
      },
      theme: {
        color: "#3171ce",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <Fragment>
      <div className="checkout-container">
        <div className="checkout-contents">
          {paymentStatus && (
            <div className="order-done">
              <OrderDone />
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}>
                Payment Done
              </motion.h3>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, easings: "easeInOut" }}>
                <Link to="/myorders">Go to Orders </Link>
              </motion.button>
            </div>
          )}
          {paymentError && (
            <div className="order-done">
              <OrderError />
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}>
                Payment failed
              </motion.h3>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, easings: "easeInOut" }}>
                <Link to="/cart">Go Back </Link>
              </motion.button>
            </div>
          )}
          {/* <div className="address-mob">
            <h2>Order Details</h2>
            <div className="price-details">
              <p>
                Total: <span className="price-1">₹{GrandTotal}</span>
              </p>
              <span>{convertor.toWords(GrandTotal) + " rupees only"} </span>
            </div>
            <button onClick={handleSubmit}>Pay now</button>
          </div> */}
          <div className="form-details">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeIn" }}
              className="checkout-header">
              <h2>Address Details</h2>
              <div className="price-details">
                <p>
                  Total: <span className="price-1">₹{GrandTotal}</span>
                </p>
                <span>{convertor.toWords(GrandTotal) + " rupees only"} </span>
              </div>
            </motion.div>{" "}
            <div className="svg-bg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path d="M0,32L1440,256L1440,320L0,320Z"></path>
              </svg>
            </div>
            <form onSubmit={handleSubmit} id="mobform">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeIn", delay: 0.5 }}
                className="address-left">
                <label>Name</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Name"
                  value={userDetails?.username}
                />
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userDetails?.email}
                />
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  onChange={(e) =>
                    setUserAddress({ ...userAddress, city: e.target.value })
                  }
                />
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  maxLength="13"
                  title="max of 12 charcters"
                  placeholder="Phone"
                  onChange={(e) =>
                    setUserAddress({
                      ...userAddress,
                      phoneNumber: e.target.value,
                    })
                  }
                />
                <span className="errors">{mobileError && "not valid"}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeIn", delay: 0.5 }}
                className="address-right">
                <label>Address</label>
                <textarea
                  cols="30"
                  rows="4"
                  name="address"
                  minLength="10"
                  title="minmum 10 charecters"
                  onChange={(e) =>
                    setUserAddress({ ...userAddress, address: e.target.value })
                  }
                  placeholder="Address"
                  required></textarea>
                <span className="errors">
                  {addressError && "minimum of 10 characters"}
                </span>
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  pattern="^[1-9][0-9]{5}$"
                  title="Not valid"
                  placeholder="Pincode"
                  required
                  onChange={(e) =>
                    setUserAddress({ ...userAddress, pincode: e.target.value })
                  }
                />
                <span className="errors pincode">
                  {pinError && "Not a valid Pincode"}
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeIn", delay: 0.5 }}
                className="checkout-page-btn">
                <button type="submit">Place order</button>
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "black" }}>
                  <span> Cancel/Back </span>
                </Link>
              </motion.div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = createStructuredSelector({
  total: selectCartItemTotal,
});

export default connect(mapStateToProps)(Checkout);
