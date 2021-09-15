/** @format */

import React, { Fragment } from "react";
import RegisterForm from "../../components/authForm/RegisterForm.component";
import Alert from "../../components/alert/alert.component";
import "./login.styles.scss";
import { motion } from "framer-motion";

const Register = () => {
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
          <Alert />
          <RegisterForm />
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
