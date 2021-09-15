/** @format */

import React, { useEffect, useState } from "react";
import TeaContainer from "../../components/productsTea/TeaContainer";
import { motion } from "framer-motion";
import "./tea.styles.scss";

const Tea = () => {
  const [Width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, [window.innerWidth]);

  return (
    <div className="products-container">
      <div className="product-text-overlay">
        <h2>Tea</h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.25 }}
        exit={{ opacity: 0 }}
        className="product-first-bg">
        <img
          className="product-bg"
          src={
            Width < breakpoint
              ? "../images/teaware/mob/tea_landing_mob.webp"
              : "../images/teaware/tea_landing.webp"
          }
          alt="error"
        />
        {/* <h1 className="product-h1">Tea Ware</h1> */}
      </motion.div>
      <div className="product-contents">
        <TeaContainer />
      </div>
    </div>
  );
};

export default Tea;
