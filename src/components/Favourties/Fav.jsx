/** @format */

import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import "./fav.styles.scss";
import { unFav } from "../../redux/fav/fav.action";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Fav = ({ details }) => {
  const dispatch = useDispatch();
  const handleRemove = (itemData) => {
    dispatch(unFav(itemData));
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fav-item">
      <div className="remove-fav" onClick={() => handleRemove(details)}>
        <AiOutlineCloseCircle className="remove-icon" />
      </div>
      <div className="fav-item-img">
        {parseInt(details.id) <= 10 && (
          <Link
            to={
              "/single/product/" +
              details.id +
              "?productId=" +
              details.productId
            }>
            <img src={details.imageURL} alt="error" />
          </Link>
        )}
        {parseInt(details.id) >= 11 && (
          <Link to={"/single/product/" + details.id}>
            <img src={details.imageURL} alt="error" />
          </Link>
        )}
      </div>
      <div className="fav-item-details">
        {parseInt(details.id) <= 10 && (
          <Link
            to={
              "/single/product/" +
              details.id +
              "?productId=" +
              details.productId
            }
            className="link-tag">
            <p>{details.name}</p>
          </Link>
        )}
        {parseInt(details.id) >= 11 && (
          <Link className="link-tag" to={"/single/product/" + details.id}>
            <p>{details.name}</p>
          </Link>
        )}
        <span>{details.price + " gms"}</span>
      </div>
    </motion.div>
  );
};

export default Fav;
