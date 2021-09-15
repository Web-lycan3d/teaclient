/** @format */
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { MdExpandLess } from "react-icons/md";

import "./dropdown.styles.scss";

import OrderdItems from "./OrderdItems/OrderdItems";
import { motion } from "framer-motion";
const Dropdown = ({ value, orStatus, st, updateState }) => {

  return (
    <motion.div layout className="dropdown-conatiner">
      <div className="dropdown-contents">
        <Accordion className="dropdown-accord">
          <AccordionSummary expandIcon={<MdExpandLess />}>
            {/* {orStatus && (
              <div
                className={
                  st ? "status-color status-red" : "status-color status-green"
                }></div>
            )} */}
            {orStatus && (
              <div className="status-new-colours">
                {value?.orderdItems.map((it, index) =>
                  it.status === "Order Processing" ? (
                    <span className="order-p"></span>
                  ) : it.status === "In Transit" ? (
                    <span className="order-t"></span>
                  ) : (
                    ""
                  )
                )}
              </div>
            )}
            <div className="dropdown-details">
              <div className="dropdown-details-left">
                <h1>{value.userName}</h1>
                <div className="dropdown-details-left-user">
                  <span>User id: {value.userId} </span>
                  <span>Email: {value.email} </span>
                </div>
              </div>

              {/* <div className="dropdown-details-right">
                <h2>₹ {total}</h2>
                <span>{convertor.toWords(total) + " only"}</span>
              </div> */}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {orStatus ? (
              <motion.div layout className="items-orderd-flex">
                {value?.orderdItems.map((item, index) =>
                  item.status === "Order Processing" ||
                  item.status === "In Transit" ? (
                    <OrderdItems
                      data={item}
                      key={index}
                      userid={value.userId}
                      deliverState={true}
                      updateState={updateState}
                    />
                  ) : (
                    ""
                  )
                )}
              </motion.div>
            ) : (
              <div className="items-orderd-flex">
                {value?.orderdItems.map((item, index) =>
                  item.status === "Delivered" ? (
                    <OrderdItems
                      data={item}
                      key={index}
                      userid={value.userId}
                      deliverState={true}
                      updateState={updateState}
                    />
                  ) : (
                    <OrderdItems
                      data={item}
                      key={index}
                      userid={value.userId}
                      deliverState={false}
                      updateState={updateState}
                    />
                  )
                )}
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      </div>
    </motion.div>
  );
};
export default Dropdown;
