/** @format */

import React, { useState, useEffect } from "react";
// import SearchBar from "material-ui-search-bar";
import "./AdminDashboard.styles.scss";
import Dropdown from "../../components/dropdown/Dropdown";
import axios from "axios";
import apiUrl from "../../apiUrl/api";
import { motion } from "framer-motion";
const backendUrl = apiUrl();


// const doSomethingWith = (value) => {
//   console.log(value);
// };

const AdminDashboard = () => {
  // const [value, setValue] = useState("");
  const [option, setOption] = useState(null);
  const [userData, setUserData] = useState([]);
  const [upstate, setupState] = useState(false);

  useEffect(() => {
    fetchData();
  }, [upstate]);
  const updateState = () => {
    setupState(!upstate);
  };
  const fetchData = async () => {
    console.log("S");
    try {
      const { data } = await axios.get(backendUrl + "/api/user/admin/userdata");
      data && setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const Droplist = (value) => {
    if (value) {
      return (
        userData &&
        userData.map(
          (item, index) =>
            item.orderdItems.find(
              (el) =>
                el.status === "Order Processing" || el.status === "In Transit"
            ) && (
              <Dropdown
                value={item}
                key={index}
                orStatus={value}
                st={true}
                updateState={updateState}
              />
            )
        )
      );
    } else {
      return (
        userData &&
        userData.map((item, index) => (
          <Dropdown
            value={item}
            key={index}
            orStatus={value}
            updateState={updateState}
          />
        ))
      );
    }
  };
  return (
    <div className="admin-dashboard-container">
      <div className="admin-dsahboard-header">
        <div className="admin-dashboard-heading">
          <h1>Admin Dashboard</h1>{" "}
          {/* <div className="admin-dashboard-search">
            <SearchBar
              className="dashboard-search-bar"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              onRequestSearch={() => doSomethingWith(value)}
            />
          </div> */}
        </div>

        <div className="admin-dashboard-nav">
          <span
            onClick={() => setOption(true)}
            className={
              option
                ? "admin-dashboard-navlist active"
                : "admin-dashboard-navlist"
            }>
            New Orders
          </span>
          <span
            onClick={() => setOption(false)}
            className={
              option
                ? "admin-dashboard-navlist"
                : "admin-dashboard-navlist active"
            }>
            Orders
          </span>
        </div>
      </div>
      <motion.div layout className="admin-dashboard-content">
        {option ? Droplist(true) : Droplist(false)}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;