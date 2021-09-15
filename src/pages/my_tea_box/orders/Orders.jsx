/** @format */

import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import UserNav from "../../../components/User_Navbar/UserNav.component";

import CartBox from "../../../components/cart-items/CartBox";
import "./Orders.styles.scss";
import LottieAnimation from "../../../components/lottie/LottieAnimation";
import { Link } from "react-router-dom";

const Orders = () => {
  const [ordersData, setOrderData] = useState("");
  const [orderId, setOrderId] = useState("");
  const orders = useSelector((data) => data.user);

  useEffect(() => {
    orders && setOrderData(orders?.user?.orders);
    orders && setOrderId(orders?.user?.orders?.orderId);
  }, [orders]);

  return (
    <div>
      <UserNav />
      <div className="cart-container">
        <div className="cart-contents">
          <h2>My Orders</h2>
          <div className="cart-body">
            {ordersData ? (
              <>
                {ordersData.orderdItems?.map((item, index) => (
                  <CartBox
                    items={item}
                    key={index}
                    count={index + 1}
                    orderId={orderId}
                  />
                ))}
                <div className="cancel-order">
                  <p>
                    For any order that you wish to cancel, please drop us a mail
                    with your order id and contact
                    details to support@teainbox.in and we will process the order cancellation from our
                    end.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="no-orders">
                  <LottieAnimation w={200} h={100} />
                  <p>No orders found </p>

                  <Link to="/tea">
                    <button>Order Now</button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
