/** @format */

import React, { useState } from "react";
import "./orderditems2.styles.scss";
import { BiPhone, BiIdCard } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";

const OrderdItems = ({ data, userid, updateState, deliverState }) => {
  console.log(data)
  const [status, setStatus] = useState("Order Processing");

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const Datalist = {
      text: status,
      id: id,
      userid: userid,
    };
    const resp = await axios.post("/api/user/admin/update", Datalist);
    if (resp) updateState();
  };

  return (
    <>
      <div className="dropdown-flow">
        {/* <div
          className={
            deliverState
              ? "status-color status-green"
              : "status-color status-red"
          }></div> */}
        <div className="details-address">
          <p>
            <BiPhone className="address-icons" /> {data.phoneNumber}
          </p>
          <p>
            <AiOutlineMail className="address-icons" /> {data.email}
          </p>
          <p>
            <BiIdCard className="address-icons" /> {data.orderId}
          </p>
        </div>
        <div className="dropdown-flow-left">
          <div className="items-orderd-list">
            {data.orderdData.map((list) => (
              <span>
                {`${list.name.substring(0, 3)}${list.price} X ${list.quantity}`}{" "}
              </span>
            ))}
          </div>
          <div className="items-orderd-address">
            <span>{`${data.Address},${data.City},${data.Pincode} `}</span>

            <span>{`Order Date : ${data.orderDate}`}</span>
            <span>{`Order Price : ${data.orderTotal}`}</span>
          </div>
        </div>
        <div className="dropdown-flow-right">
          <span>{`Cancel Status: ${data.orderCancel}`}</span>
          <form onSubmit={(e) => handleSubmit(e, data.orderId)}>
            <input type="hidden" value={data.orderId} name="orderid" />
            <select
              name="orderstatus"
              className="select-option"
              onChange={(e) => setStatus(e.target.value)}>
              <option
                value="Order Processing"
                selected={data.status === "Order Processing" ? "selected" : ""}>
                Order Processing
              </option>
              <option
                value="In Transit"
                selected={data.status === "In Transit" ? "selected" : ""}>
                In Transit
              </option>
              <option
                value="Delivered"
                selected={data.status === "Delivered" ? "selected" : ""}>
                Delivered
              </option>
              <option
                value="Refund initiated"
                selected={data.status === "Refund initiated" ? "selected" : ""}>
                Refund
              </option>
              <option
                value="Cancelled"
                selected={data.status === "Cancelled" ? "selected" : ""}>
                Cancelled
              </option>
            </select>
            <span className="data-status">Status:{" "}{data.status}</span>
            <button type="submit">Submit</button>{" "}
          </form>
        </div>
      </div>{" "}
    </>
  );
};

export default OrderdItems;
