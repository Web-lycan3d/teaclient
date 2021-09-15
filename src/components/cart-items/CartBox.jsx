/** @format */

import React, { useState } from "react";

import "./cartbox.styles.scss";
import OrderItems from "./OrderItems";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { MdExpandLess } from "react-icons/md";
// import { GiBackwardTime } from "react-icons/gi";
// import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import apiUrl from "../../apiUrl/api";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/user/user.actions";

const backendUrl = apiUrl();
const CartBox = ({ items, count, orderId }) => {
  const [cancelState, setCancelState] = useState(false);
  const dispatch = useDispatch();
  const handleOrderCancel = async (orderData) => {
    try {
      const resp = await axios.post(
        backendUrl + "/api/order/cancel/" + orderData.orderId,
        orderData
      );
      if (resp) setCancelState(false);
      dispatch(loadUser());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="cart-box">
      <Accordion className="box">
        <AccordionSummary expandIcon={<MdExpandLess />}>
          {cancelState && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="order-cancel-request">
              <h6>Once cancelled you cannot retain the order!</h6>
              <div className="cancel-btns">
                <button onClick={() => handleOrderCancel(items)}>
                  Cancel Order
                </button>
                <button onClick={() => setCancelState(false)}>Go back</button>
              </div>
            </motion.div>
          )}
          <div className="summary-orders-main">
            <div className="item-details">
              <span>Item: {count}</span>

              <span>
                Ordered On: {items.orderDate} | OrderId : {items.orderId}
              </span>

              <p>
                Total &nbsp; <span> ₹{items.orderTotal}</span>{" "}
              </p>
            </div>

            <div className="order-address-main">
              <p>
                Address{" "}
                <span className="order-status">
                  {items.orderCancel
                    ? items.status === "Order Processing"
                      ? "Updating Order"
                      : items.status
                    : items.status}
                </span>{" "}
              </p>
              <span>{`${items.Address} | ${items.City} | ${items.Pincode} `}</span>
              <span>{items.email}</span>
              <span>{items.phoneNumber}</span>

              {items.orderCancel ? (
                <button className="order-no-cancel">
                  {items.status === "Cancelled"
                    ? ""
                    : "Cancellation in Process"}
                </button>
              ) : items.status === "Delivered" ? (
                ""
              ) : (
                <button
                  onClick={() => setCancelState(true)}
                  className="order-cancel">
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="items-orderd">
            <h5>Items Ordered</h5>
            {items.orderdData?.map((orderdItem, index) => (
              <OrderItems item={orderdItem} key={index} />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CartBox;
