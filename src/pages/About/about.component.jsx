/** @format */

import React from "react";

import "./about.styles.scss";
import { motion } from "framer-motion";

const About = () => {
  <head>
    <title>About</title>
  </head>;
  return (
    <div className="aboutContainer">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="about-img ">
        <img
          src="/images/about/about-img.webp"
          alt="error"
          className="img-fluid"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="about-text">
        <h1>About Tea In Box</h1>
        <p>
          We are a young brand based out of Bangalore, established to celebrate
          the intricately beautiful nature of Tea, which survived centuries and
          is still unravelling its secrets.{" "}
        </p>
        <p>
          We are a team of Tea connoisseurs & our collective passion for Tea
          spurred the creation of Tea in Box.{" "}
        </p>
        <p>
          We have taken it upon ourselves to introduce healthy Tea into the
          daily routine for every Tea enthusiast, who likes to experiment with
          taste. We're looking forward to taking you on an adventure that is
          carefully crafted with excellent attention to detail. Tea in Box
          ensures that you take a moment away from all the noise and immerse
          yourself in this soothing experience.{" "}
        </p>
        <p>
          We at Tea in Box advocate a way of life that embraces modernity but
          does not lose what’s precious from our past.{" "}
        </p>
      </motion.div>
    </div>
  );
};

export default About;
