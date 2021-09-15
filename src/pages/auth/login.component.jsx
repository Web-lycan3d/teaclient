/** @format */

import React, { Fragment, useEffect, useState } from "react";
import LoginForm from "../../components/authForm/loginForm.component";
import "./login.styles.scss";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const [message, setMessage] = useState(false);
  useEffect(() => {
    if (location.state?.cartMessage) {
      setMessage(true);
    } else {
      setMessage(false);
    }
  }, [location.state]);

  return (
    <Fragment>
      <div className="auth-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="auth-img ">
          <img
            src="https://i.ibb.co/C196m4p/Webp-net-compress-image-5.webp"
            alt="error"
            className="img-fluid"
          />
        </motion.div>
        <div className="auth-form">
          <LoginForm message={message} />
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
