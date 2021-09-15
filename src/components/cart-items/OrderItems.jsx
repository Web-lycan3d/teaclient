/** @format */

import React from "react";

const OrderItems = ({ item }) => {
  return (
    <>
      {/* <span className="order-status">{status}</span>
      <span className="order-delivery">{`${address},${city},${pin}`}</span> */}
      <div className="ordered-item-container">
        <div className="orderd-image">
          <img src={item.imageURL} alt="error" />
        </div>
        <div className="orderd-details">
          <h4>{item.name}</h4>
          <span>₹{item.price}</span>
          <span className="item-quantity">{item.quantity}</span>
        </div>
      </div>
    </>
  );
};

export default OrderItems;
